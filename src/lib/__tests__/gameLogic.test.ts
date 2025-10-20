import { describe, it, expect } from 'vitest';
import {
  calculateXP,
  calculateGemReward,
  getDifficultyForAge,
  getNextDifficulty,
  validateAnswer,
  generateMathQuestion,
  generateWordQuestion,
  generateCareerQuestion,
} from '../gameLogic';
import { DifficultyLevel, QuestionCategory, CareerType } from '@/types/game';

describe('gameLogic', () => {
  describe('calculateXP', () => {
    it('should award more XP for correct answers', () => {
      const correctXP = calculateXP(DifficultyLevel.EASY, true);
      const incorrectXP = calculateXP(DifficultyLevel.EASY, false);
      
      expect(correctXP).toBeGreaterThan(incorrectXP);
    });

    it('should award more XP for harder difficulties', () => {
      const easyXP = calculateXP(DifficultyLevel.EASY, true);
      const hardXP = calculateXP(DifficultyLevel.HARD, true);
      
      expect(hardXP).toBeGreaterThan(easyXP);
    });

    it('should include time bonus', () => {
      const baseXP = calculateXP(DifficultyLevel.MEDIUM, true);
      const bonusXP = calculateXP(DifficultyLevel.MEDIUM, true, 10);
      
      expect(bonusXP).toBe(baseXP + 10);
    });
  });

  describe('calculateGemReward', () => {
    it('should award at least 1 gem', () => {
      const gems = calculateGemReward(DifficultyLevel.EASY, 0);
      expect(gems).toBeGreaterThanOrEqual(1);
    });

    it('should award more gems for streak bonuses', () => {
      const noStreak = calculateGemReward(DifficultyLevel.MEDIUM, 0);
      const withStreak = calculateGemReward(DifficultyLevel.MEDIUM, 10);
      
      expect(withStreak).toBeGreaterThanOrEqual(noStreak);
    });
  });

  describe('getDifficultyForAge', () => {
    it('should return EASY for young children (2-5 years)', () => {
      expect(getDifficultyForAge(2)).toBe(DifficultyLevel.EASY);
      expect(getDifficultyForAge(5)).toBe(DifficultyLevel.EASY);
    });

    it('should return MEDIUM for elementary (5-9 years)', () => {
      expect(getDifficultyForAge(7)).toBe(DifficultyLevel.MEDIUM);
    });

    it('should return HARD for intermediate (9-13 years)', () => {
      expect(getDifficultyForAge(11)).toBe(DifficultyLevel.HARD);
    });

    it('should return EXPERT for advanced (13-15+ years)', () => {
      expect(getDifficultyForAge(14)).toBe(DifficultyLevel.EXPERT);
      expect(getDifficultyForAge(20)).toBe(DifficultyLevel.EXPERT);
    });
  });

  describe('getNextDifficulty', () => {
    it('should increase difficulty with high performance', () => {
      const highPerformance = [1, 1, 1, 0.9, 0.9]; // 90% average
      const nextDiff = getNextDifficulty(DifficultyLevel.EASY, highPerformance);
      
      expect(nextDiff).toBe(DifficultyLevel.MEDIUM);
    });

    it('should decrease difficulty with low performance', () => {
      const lowPerformance = [0, 0.2, 0.3, 0.1, 0]; // 12% average
      const nextDiff = getNextDifficulty(DifficultyLevel.HARD, lowPerformance);
      
      expect(nextDiff).toBe(DifficultyLevel.MEDIUM);
    });

    it('should maintain difficulty with average performance', () => {
      const avgPerformance = [0.5, 0.6, 0.5, 0.7, 0.5]; // 56% average
      const nextDiff = getNextDifficulty(DifficultyLevel.MEDIUM, avgPerformance);
      
      expect(nextDiff).toBe(DifficultyLevel.MEDIUM);
    });
  });

  describe('validateAnswer', () => {
    it('should match answers case-insensitively', () => {
      const question = { correctAnswer: 'Apple' } as any;
      
      expect(validateAnswer(question, 'apple')).toBe(true);
      expect(validateAnswer(question, 'APPLE')).toBe(true);
      expect(validateAnswer(question, 'Apple')).toBe(true);
    });

    it('should trim whitespace', () => {
      const question = { correctAnswer: 'Apple' } as any;
      
      expect(validateAnswer(question, '  apple  ')).toBe(true);
    });

    it('should handle numeric answers', () => {
      const question = { correctAnswer: 42 } as any;
      
      expect(validateAnswer(question, 42)).toBe(true);
      expect(validateAnswer(question, '42')).toBe(true);
    });

    it('should return false for incorrect answers', () => {
      const question = { correctAnswer: 'Apple' } as any;
      
      expect(validateAnswer(question, 'Orange')).toBe(false);
    });
  });

  describe('generateMathQuestion', () => {
    it('should generate a valid math question', () => {
      const question = generateMathQuestion(DifficultyLevel.EASY);
      
      expect(question).toHaveProperty('id');
      expect(question).toHaveProperty('question');
      expect(question).toHaveProperty('correctAnswer');
      expect(question).toHaveProperty('options');
      expect(question.category).toBe(QuestionCategory.QUANTITATIVE);
      expect(question.difficulty).toBe(DifficultyLevel.EASY);
    });

    it('should generate 4 options including the correct answer', () => {
      const question = generateMathQuestion(DifficultyLevel.MEDIUM);
      
      expect(question.options).toHaveLength(4);
      expect(question.options).toContain(question.correctAnswer.toString());
    });

    it('should have appropriate difficulty level', () => {
      const question = generateMathQuestion(DifficultyLevel.HARD);
      
      expect(question.difficulty).toBe(DifficultyLevel.HARD);
      expect(question.points).toBeGreaterThanOrEqual(20);
    });
  });

  describe('generateWordQuestion', () => {
    it('should generate a valid word question', () => {
      const question = generateWordQuestion(DifficultyLevel.EASY);
      
      expect(question).toHaveProperty('id');
      expect(question).toHaveProperty('question');
      expect(question).toHaveProperty('correctAnswer');
      expect(question).toHaveProperty('options');
      expect(question.category).toBe(QuestionCategory.VERBAL);
    });

    it('should have hint and explanation', () => {
      const question = generateWordQuestion(DifficultyLevel.MEDIUM);
      
      expect(question.hint).toBeTruthy();
      expect(question.explanation).toBeTruthy();
    });
  });

  describe('generateCareerQuestion', () => {
    it('should generate a valid career question', () => {
      const question = generateCareerQuestion(DifficultyLevel.MEDIUM, CareerType.IT);
      
      expect(question).toHaveProperty('id');
      expect(question).toHaveProperty('question');
      expect(question).toHaveProperty('correctAnswer');
      expect(question).toHaveProperty('options');
      expect(question.category).toBe(QuestionCategory.CAREER);
      expect(question.career).toBe(CareerType.IT);
    });

    it('should generate questions for different careers', () => {
      const lawQuestion = generateCareerQuestion(DifficultyLevel.EASY, CareerType.LAW);
      const medicalQuestion = generateCareerQuestion(DifficultyLevel.EASY, CareerType.MEDICAL);
      
      expect(lawQuestion.career).toBe(CareerType.LAW);
      expect(medicalQuestion.career).toBe(CareerType.MEDICAL);
    });
  });
});

