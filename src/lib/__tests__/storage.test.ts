import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GameStorage, createUser, updateUser, saveUser, loadUser } from '../storage';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

// Setup global mocks
if (typeof global !== 'undefined') {
  Object.defineProperty(global, 'localStorage', {
    value: localStorageMock,
  });
}

describe('Storage', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  describe('GameStorage', () => {
    it('should get and set values', () => {
      const testData = { name: 'Test', value: 123 };
      
      GameStorage.set('test_key', testData);
      const retrieved = GameStorage.get('test_key', null);
      
      expect(retrieved).toEqual(testData);
    });

    it('should return default value if key does not exist', () => {
      const defaultValue = { default: true };
      const retrieved = GameStorage.get('nonexistent_key', defaultValue);
      
      expect(retrieved).toEqual(defaultValue);
    });

    it('should remove values', () => {
      GameStorage.set('test_key', 'test_value');
      GameStorage.remove('test_key');
      
      const retrieved = GameStorage.get('test_key', null);
      expect(retrieved).toBeNull();
    });

    it('should handle JSON parse errors gracefully', () => {
      // Manually set invalid JSON
      localStorageMock.setItem('corrupt_key', '{invalid json}');
      
      const retrieved = GameStorage.get('corrupt_key', 'default');
      expect(retrieved).toBe('default');
    });
  });

  describe('User Management', () => {
    it('should create a new user', () => {
      const user = createUser(10, 'TestUser');
      
      expect(user).toHaveProperty('id');
      expect(user.age).toBe(10);
      expect(user.name).toBe('TestUser');
      expect(user.gems).toBeGreaterThan(0);
      expect(user.level).toBe(1);
      expect(user.streak).toBe(0);
    });

    it('should save and load user', () => {
      const user = createUser(8, 'SavedUser');
      saveUser(user);
      
      const loaded = loadUser();
      expect(loaded).toEqual(user);
    });

    it('should update user', () => {
      const user = createUser(12, 'UpdateUser');
      saveUser(user);
      
      const updated = updateUser({ gems: 50, level: 2 });
      
      expect(updated?.gems).toBe(50);
      expect(updated?.level).toBe(2);
      expect(updated?.name).toBe('UpdateUser'); // Original properties preserved
    });

    it('should return null when updating non-existent user', () => {
      localStorageMock.clear();
      const updated = updateUser({ gems: 100 });
      
      expect(updated).toBeNull();
    });
  });

  describe('Error Handling', () => {
    it('should handle storage quota exceeded', () => {
      // Mock setItem to throw QuotaExceededError
      const originalSetItem = localStorageMock.setItem;
      let callCount = 0;
      
      localStorageMock.setItem = (key: string, value: string) => {
        callCount++;
        if (callCount === 1) {
          const error = new DOMException('QuotaExceededError');
          (error as any).name = 'QuotaExceededError';
          throw error;
        }
        originalSetItem(key, value);
      };

      // This should not throw, but handle the error gracefully
      expect(() => {
        GameStorage.set('test_key', { large: 'data' });
      }).not.toThrow();

      // Restore original
      localStorageMock.setItem = originalSetItem;
    });
  });
});

