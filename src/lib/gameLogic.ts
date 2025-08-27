import { Question, QuestionCategory, QuestionType, DifficultyLevel, CareerType } from '@/types/game';

// Question difficulty points mapping
const DIFFICULTY_POINTS = {
  [DifficultyLevel.EASY]: 10,
  [DifficultyLevel.MEDIUM]: 20,
  [DifficultyLevel.HARD]: 30,
  [DifficultyLevel.EXPERT]: 50,
};

// XP calculation based on difficulty and accuracy
export const calculateXP = (difficulty: DifficultyLevel, isCorrect: boolean, timeBonus: number = 0): number => {
  const baseXP = DIFFICULTY_POINTS[difficulty];
  const bonus = isCorrect ? baseXP : Math.floor(baseXP * 0.1);
  return bonus + timeBonus;
};

// Gem rewards calculation
export const calculateGemReward = (difficulty: DifficultyLevel, streak: number): number => {
  const baseGems = Math.floor(DIFFICULTY_POINTS[difficulty] / 10);
  const streakBonus = Math.floor(streak / 5);
  return Math.max(1, baseGems + streakBonus);
};

// Determine user's appropriate difficulty level
export const getDifficultyForAge = (age: number): DifficultyLevel => {
  if (age < 8) return DifficultyLevel.EASY;
  if (age < 12) return DifficultyLevel.EASY;
  if (age < 16) return DifficultyLevel.MEDIUM;
  if (age < 20) return DifficultyLevel.HARD;
  return DifficultyLevel.EXPERT;
};

// Adaptive difficulty scaling
export const getNextDifficulty = (
  currentDifficulty: DifficultyLevel,
  recentPerformance: number[]
): DifficultyLevel => {
  const avgPerformance = recentPerformance.reduce((a, b) => a + b, 0) / recentPerformance.length;
  
  if (avgPerformance > 0.8 && currentDifficulty !== DifficultyLevel.EXPERT) {
    // Increase difficulty if performing well
    const difficulties = Object.values(DifficultyLevel);
    const currentIndex = difficulties.indexOf(currentDifficulty);
    return difficulties[currentIndex + 1] || currentDifficulty;
  } else if (avgPerformance < 0.4 && currentDifficulty !== DifficultyLevel.EASY) {
    // Decrease difficulty if struggling
    const difficulties = Object.values(DifficultyLevel);
    const currentIndex = difficulties.indexOf(currentDifficulty);
    return difficulties[currentIndex - 1] || currentDifficulty;
  }
  
  return currentDifficulty;
};

// Generate random math questions
export const generateMathQuestion = (difficulty: DifficultyLevel): Question => {
  const operations = ['+', '-', '×', '÷'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  
  let num1: number, num2: number, answer: number, question: string;
  
  switch (difficulty) {
    case DifficultyLevel.EASY:
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      break;
    case DifficultyLevel.MEDIUM:
      num1 = Math.floor(Math.random() * 50) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
      break;
    case DifficultyLevel.HARD:
      num1 = Math.floor(Math.random() * 100) + 1;
      num2 = Math.floor(Math.random() * 50) + 1;
      break;
    default:
      num1 = Math.floor(Math.random() * 200) + 1;
      num2 = Math.floor(Math.random() * 100) + 1;
  }
  
  switch (operation) {
    case '+':
      answer = num1 + num2;
      question = Math.random() > 0.5 ? `□ + ${num2} = ${answer}` : `${num1} + □ = ${answer}`;
      break;
    case '-':
      answer = Math.random() > 0.5 ? num1 : num2;
      question = answer === num1 ? `□ - ${num2} = ${num1 - num2}` : `${num1 + num2} - □ = ${num1}`;
      break;
    case '×':
      answer = Math.random() > 0.5 ? num1 : num2;
      question = answer === num1 ? `□ × ${num2} = ${num1 * num2}` : `${num1} × □ = ${num1 * num2}`;
      break;
    case '÷':
      const result = num1;
      num1 = result * num2;
      answer = Math.random() > 0.5 ? result : num2;
      question = answer === result ? `${num1} ÷ □ = ${result}` : `□ ÷ ${num2} = ${result}`;
      break;
    default:
      answer = num1;
      question = `□ + ${num2} = ${num1 + num2}`;
  }
  
  return {
    id: `math_${Date.now()}_${Math.random()}`,
    category: QuestionCategory.QUANTITATIVE,
    type: QuestionType.MATH_EQUATION,
    difficulty,
    question,
    correctAnswer: answer,
    points: DIFFICULTY_POINTS[difficulty],
  };
};

// Generate word completion questions
export const generateWordQuestion = (difficulty: DifficultyLevel): Question => {
  const words = {
    [DifficultyLevel.EASY]: [
      { word: 'Apple', blank: 'A_ple', answer: 'p' },
      { word: 'House', blank: 'H_use', answer: 'o' },
      { word: 'Cat', blank: 'C_t', answer: 'a' },
      { word: 'Dog', blank: 'D_g', answer: 'o' },
      { word: 'Sun', blank: 'S_n', answer: 'u' },
    ],
    [DifficultyLevel.MEDIUM]: [
      { word: 'Computer', blank: 'Comp_ter', answer: 'u' },
      { word: 'Beautiful', blank: 'Beau_iful', answer: 't' },
      { word: 'Education', blank: 'Educ_tion', answer: 'a' },
      { word: 'Mountain', blank: 'Mount_in', answer: 'a' },
      { word: 'Rainbow', blank: 'Rain_ow', answer: 'b' },
    ],
    [DifficultyLevel.HARD]: [
      { word: 'Psychology', blank: 'Psych_logy', answer: 'o' },
      { word: 'Philosophy', blank: 'Phil_sophy', answer: 'o' },
      { word: 'Architecture', blank: 'Archit_cture', answer: 'e' },
      { word: 'Democracy', blank: 'Dem_cracy', answer: 'o' },
      { word: 'Technology', blank: 'Techn_logy', answer: 'o' },
    ],
    [DifficultyLevel.EXPERT]: [
      { word: 'Metamorphosis', blank: 'Metam_rphosis', answer: 'o' },
      { word: 'Extraordinary', blank: 'Extraord_nary', answer: 'i' },
      { word: 'Pronunciation', blank: 'Pronunci_tion', answer: 'a' },
      { word: 'Entrepreneurship', blank: 'Entrepren_urship', answer: 'e' },
      { word: 'Pharmaceutical', blank: 'Pharmac_utical', answer: 'e' },
    ],
  };
  
  const wordList = words[difficulty];
  const selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
  
  return {
    id: `word_${Date.now()}_${Math.random()}`,
    category: QuestionCategory.VERBAL,
    type: QuestionType.WORD_COMPLETION,
    difficulty,
    question: `Complete the word: ${selectedWord.blank}`,
    correctAnswer: selectedWord.answer,
    hint: `The complete word is "${selectedWord.word}"`,
    points: DIFFICULTY_POINTS[difficulty],
  };
};

// Generate career-based vocabulary questions
export const generateCareerQuestion = (difficulty: DifficultyLevel): Question => {
  const careerWords = {
    [CareerType.LAWYER]: [
      { word: 'Court', blank: 'Cou_t', answer: 'r' },
      { word: 'Defense', blank: 'Def_nse', answer: 'e' },
      { word: 'Justice', blank: 'Just_ce', answer: 'i' },
      { word: 'Evidence', blank: 'Evid_nce', answer: 'e' },
    ],
    [CareerType.DOCTOR]: [
      { word: 'Patient', blank: 'Pat_ent', answer: 'i' },
      { word: 'Diagnosis', blank: 'Diagn_sis', answer: 'o' },
      { word: 'Medicine', blank: 'Med_cine', answer: 'i' },
      { word: 'Surgery', blank: 'Surg_ry', answer: 'e' },
    ],
    [CareerType.ENGINEER]: [
      { word: 'Design', blank: 'Des_gn', answer: 'i' },
      { word: 'Blueprint', blank: 'Bluepr_nt', answer: 'i' },
      { word: 'Structure', blank: 'Struct_re', answer: 'u' },
      { word: 'Innovation', blank: 'Innov_tion', answer: 'a' },
    ],
    [CareerType.POLICE]: [
      { word: 'Arrest', blank: 'Arr_st', answer: 'e' },
      { word: 'Investigation', blank: 'Investig_tion', answer: 'a' },
      { word: 'Security', blank: 'Sec_rity', answer: 'u' },
      { word: 'Protection', blank: 'Prot_ction', answer: 'e' },
    ],
  };
  
  const careers = Object.keys(careerWords) as CareerType[];
  const selectedCareer = careers[Math.floor(Math.random() * careers.length)];
  const words = careerWords[selectedCareer];
  const selectedWord = words[Math.floor(Math.random() * words.length)];
  
  return {
    id: `career_${Date.now()}_${Math.random()}`,
    category: QuestionCategory.CAREER,
    type: QuestionType.WORD_COMPLETION,
    difficulty,
    question: `Complete this ${selectedCareer} term: ${selectedWord.blank}`,
    correctAnswer: selectedWord.answer,
    career: selectedCareer,
    hint: `Think about ${selectedCareer} terminology`,
    points: DIFFICULTY_POINTS[difficulty],
  };
};

// Main question generator
export const generateQuestion = (
  category: QuestionCategory,
  difficulty: DifficultyLevel
): Question => {
  switch (category) {
    case QuestionCategory.QUANTITATIVE:
      return generateMathQuestion(difficulty);
    case QuestionCategory.VERBAL:
      return generateWordQuestion(difficulty);
    case QuestionCategory.CAREER:
      return generateCareerQuestion(difficulty);
    default:
      return generateMathQuestion(difficulty);
  }
};

// Validate answer
export const validateAnswer = (question: Question, userAnswer: string | number): boolean => {
  const correctAnswer = String(question.correctAnswer).toLowerCase().trim();
  const userAnswerStr = String(userAnswer).toLowerCase().trim();
  return correctAnswer === userAnswerStr;
};

