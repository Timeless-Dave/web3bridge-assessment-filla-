import { Question, QuestionCategory, DifficultyLevel, QuestionType, CareerType } from '@/types/game';

interface QuestionBank {
  quantitative: Question[];
  verbal: Question[];
  career: Question[];
}

/**
 * Fetch questions from the API route
 * Falls back to local import if API fails
 */
export async function fetchQuestions(category: QuestionCategory): Promise<Question[]> {
  try {
    const res = await fetch('/api/questions', { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch questions: ${res.status}`);
    }
    
    const data: QuestionBank = await res.json();
    const questions = data[category as keyof QuestionBank] || [];
    
    // Normalize and validate questions
    return questions
      .map(q => normalizeQuestion(q, category))
      .filter((q): q is Question => q !== null);
  } catch (error) {
    console.error('Error fetching questions from API:', error);
    
    // Fallback to local import
    try {
      const bankModule = await import('@/data/questions.json');
      const bank: QuestionBank = bankModule.default;
      const questions = bank[category as keyof QuestionBank] || [];
      
      return questions
        .map(q => normalizeQuestion(q, category))
        .filter((q): q is Question => q !== null);
    } catch (fallbackError) {
      console.error('Error loading questions from local file:', fallbackError);
      return [];
    }
  }
}

/**
 * Normalize and validate a question object
 * Ensures all required fields are present and properly typed
 */
export function normalizeQuestion(q: any, category: QuestionCategory): Question | null {
  try {
    // Validate required fields
    if (!q || !q.id || !q.question || !q.correctAnswer || typeof q.points !== 'number') {
      console.warn('Invalid question:', q);
      return null;
    }

    // Determine question type
    const type = q.type as QuestionType || QuestionType.MULTIPLE_CHOICE;
    
    // Validate difficulty
    const difficulty = Object.values(DifficultyLevel).includes(q.difficulty)
      ? q.difficulty as DifficultyLevel
      : DifficultyLevel.EASY;

    // Build normalized question
    const normalized: Question = {
      id: String(q.id),
      category,
      type,
      difficulty,
      question: String(q.question),
      correctAnswer: String(q.correctAnswer),
      points: Number(q.points) || 0,
    };

    // Add optional fields if present
    if (q.options && Array.isArray(q.options)) {
      normalized.options = q.options.map(String);
    }

    if (q.hint) {
      normalized.hint = String(q.hint);
    }

    if (q.explanation) {
      normalized.explanation = String(q.explanation);
    }

    if (q.career && Object.values(CareerType).includes(q.career)) {
      normalized.career = q.career as CareerType;
    }

    return normalized;
  } catch (error) {
    console.error('Error normalizing question:', error, q);
    return null;
  }
}

/**
 * Filter questions by difficulty level
 */
export function filterByDifficulty(
  questions: Question[],
  difficulty: DifficultyLevel
): Question[] {
  return questions.filter(q => q.difficulty === difficulty);
}

/**
 * Get random questions from a list
 */
export function getRandomQuestions(
  questions: Question[],
  count: number
): Question[] {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Filter career questions by career type
 */
export function filterByCareer(
  questions: Question[],
  career: CareerType
): Question[] {
  return questions.filter(q => q.career === career);
}

