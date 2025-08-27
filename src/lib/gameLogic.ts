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

// Determine user's appropriate difficulty level based on age ranges
export const getDifficultyForAge = (age: number): DifficultyLevel => {
  if (age <= 3) return DifficultyLevel.EASY;        // 2-3 years: Very basic
  if (age <= 5) return DifficultyLevel.EASY;        // 3-5 years: Basic
  if (age <= 9) return DifficultyLevel.MEDIUM;      // 5-9 years: Elementary
  if (age <= 13) return DifficultyLevel.HARD;       // 9-13 years: Intermediate
  if (age <= 15) return DifficultyLevel.EXPERT;     // 13-15 years: Advanced
  return DifficultyLevel.EXPERT;                    // 15+ years: Expert
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

// Helper function to generate math distractors
const generateMathDistractors = (correctAnswer: number, difficulty: DifficultyLevel): string[] => {
  const distractors = new Set<string>();
  const correctStr = correctAnswer.toString();
  
  // Generate plausible wrong answers
  const range = difficulty === DifficultyLevel.EASY ? 5 : 
               difficulty === DifficultyLevel.MEDIUM ? 10 : 20;
  
  // Add answers close to correct answer
  for (let i = 1; i <= range && distractors.size < 3; i++) {
    if (correctAnswer + i > 0) distractors.add((correctAnswer + i).toString());
    if (correctAnswer - i > 0) distractors.add((correctAnswer - i).toString());
  }
  
  // Add some random answers in reasonable range
  while (distractors.size < 3) {
    const randomOffset = Math.floor(Math.random() * range * 2) - range;
    const distractor = correctAnswer + randomOffset;
    if (distractor > 0 && distractor !== correctAnswer) {
      distractors.add(distractor.toString());
    }
  }
  
  return Array.from(distractors).slice(0, 3);
};

// Generate random math questions (MCQ format)
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
      num1 = Math.floor(Math.random() * 25) + 1;
      num2 = Math.floor(Math.random() * 15) + 1;
      break;
    case DifficultyLevel.HARD:
      num1 = Math.floor(Math.random() * 50) + 1;
      num2 = Math.floor(Math.random() * 25) + 1;
      break;
    default:
      num1 = Math.floor(Math.random() * 100) + 1;
      num2 = Math.floor(Math.random() * 50) + 1;
  }
  
  switch (operation) {
    case '+':
      answer = num1 + num2;
      question = `What is ${num1} + ${num2}?`;
      break;
    case '-':
      // Ensure positive result
      if (num1 < num2) [num1, num2] = [num2, num1];
      answer = num1 - num2;
      question = `What is ${num1} - ${num2}?`;
      break;
    case '×':
      answer = num1 * num2;
      question = `What is ${num1} × ${num2}?`;
      break;
    case '÷':
      // Ensure clean division
      answer = num1;
      num1 = answer * num2;
      question = `What is ${num1} ÷ ${num2}?`;
      break;
    default:
      answer = num1 + num2;
      question = `What is ${num1} + ${num2}?`;
  }
  
  // Generate MCQ options
  const distractors = generateMathDistractors(answer, difficulty);
  const options = [answer.toString(), ...distractors];
  
  // Shuffle options
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  
  return {
    id: `math_${Date.now()}_${Math.random()}`,
    category: QuestionCategory.QUANTITATIVE,
    type: QuestionType.MULTIPLE_CHOICE,
    difficulty,
    question,
    correctAnswer: answer.toString(),
    options,
    hint: `Try solving step by step: ${question.replace('What is ', '').replace('?', '')}`,
    explanation: `${question.replace('What is ', '').replace('?', '')} = ${answer}`,
    points: DIFFICULTY_POINTS[difficulty],
  };
};

// Helper function to generate word distractors
const generateWordDistractors = (correctWord: string, difficulty: DifficultyLevel): string[] => {
  const distractors = new Set<string>();
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
  
  // Create variations of the correct word
  const wordLower = correctWord.toLowerCase();
  
  // Add some similar words with letter substitutions
  for (let i = 0; i < wordLower.length && distractors.size < 3; i++) {
    const isVowel = vowels.includes(wordLower[i]);
    const substitutes = isVowel ? vowels : consonants.slice(0, 5);
    
    for (const substitute of substitutes) {
      if (substitute !== wordLower[i]) {
        const variant = wordLower.substring(0, i) + substitute + wordLower.substring(i + 1);
        if (variant !== wordLower) {
          distractors.add(variant.charAt(0).toUpperCase() + variant.slice(1));
          if (distractors.size >= 3) break;
        }
      }
    }
  }
  
  // Add common misspellings patterns if needed
  while (distractors.size < 3) {
    // Simple letter swaps for remaining distractors
    const pos = Math.floor(Math.random() * (wordLower.length - 1));
    const swapped = wordLower.substring(0, pos) + wordLower[pos + 1] + wordLower[pos] + wordLower.substring(pos + 2);
    if (swapped !== wordLower && swapped.length === wordLower.length) {
      distractors.add(swapped.charAt(0).toUpperCase() + swapped.slice(1));
    }
  }
  
  return Array.from(distractors).slice(0, 3);
};

// Generate word completion questions (MCQ format)
export const generateWordQuestion = (difficulty: DifficultyLevel): Question => {
  const words = {
    [DifficultyLevel.EASY]: [
      'Apple', 'House', 'Cat', 'Dog', 'Sun', 'Book', 'Tree', 'Ball', 'Fish', 'Bird',
      'Car', 'Toy', 'Cup', 'Hat', 'Bee', 'Moon', 'Star', 'Face', 'Hand', 'Foot'
    ],
    [DifficultyLevel.MEDIUM]: [
      'Computer', 'Beautiful', 'Education', 'Mountain', 'Rainbow', 'Adventure', 'Butterfly', 
      'Elephant', 'Chocolate', 'Fantastic', 'Geography', 'Hospital', 'Important', 'Language',
      'Magazine', 'Neighbor', 'Orchestra', 'Princess', 'Question', 'Restaurant'
    ],
    [DifficultyLevel.HARD]: [
      'Psychology', 'Philosophy', 'Architecture', 'Democracy', 'Technology', 'Bibliography',
      'Championship', 'Entrepreneur', 'Fundamental', 'Government', 'Historical', 'Independent',
      'Journalist', 'Knowledge', 'Literature', 'Mathematics', 'Navigation', 'Opportunity'
    ],
    [DifficultyLevel.EXPERT]: [
      'Metamorphosis', 'Extraordinary', 'Pronunciation', 'Entrepreneurship', 'Pharmaceutical',
      'Anthropology', 'Biotechnology', 'Characteristics', 'Electromagnetic', 'Fluorescent',
      'Gastroenterology', 'Hydroelectric', 'Interdisciplinary', 'Juxtaposition', 'Knowledgeable'
    ],
  };
  
  const wordList = words[difficulty];
  const selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
  
  // Generate MCQ options
  const distractors = generateWordDistractors(selectedWord, difficulty);
  const options = [selectedWord, ...distractors];
  
  // Shuffle options
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  
  // Create definition-based question for higher difficulty, spelling for lower
  const isDefinitionQuestion = difficulty === DifficultyLevel.HARD || difficulty === DifficultyLevel.EXPERT;
  
  let question: string;
  if (isDefinitionQuestion) {
    const definitions: { [key: string]: string } = {
      'Psychology': 'The scientific study of the mind and behavior',
      'Philosophy': 'The study of fundamental questions about existence and knowledge',
      'Architecture': 'The art and science of designing buildings',
      'Democracy': 'A system of government by the people',
      'Technology': 'The application of scientific knowledge for practical purposes',
      'Metamorphosis': 'A complete change of form or nature',
      'Extraordinary': 'Very unusual or remarkable',
      'Pronunciation': 'The way in which a word is pronounced',
      'Entrepreneurship': 'The activity of starting and running businesses',
      'Pharmaceutical': 'Relating to medicinal drugs',
      // Add more definitions as needed
    };
    
    question = definitions[selectedWord] || `Which word means something related to ${selectedWord.toLowerCase()}?`;
    question = `${question}:`;
  } else {
    question = `Which word is spelled correctly?`;
  }
  
  return {
    id: `word_${Date.now()}_${Math.random()}`,
    category: QuestionCategory.VERBAL,
    type: QuestionType.MULTIPLE_CHOICE,
    difficulty,
    question,
    correctAnswer: selectedWord,
    options,
    hint: `Think about the ${isDefinitionQuestion ? 'meaning' : 'spelling'} carefully`,
    explanation: `The correct answer is "${selectedWord}"`,
    points: DIFFICULTY_POINTS[difficulty],
  };
};

// Helper function to generate career word distractors
const generateCareerDistractors = (correctWord: string, allWords: string[], difficulty: DifficultyLevel): string[] => {
  const distractors = new Set<string>();
  
  // Get words from the same category
  const otherWords = allWords.filter(word => word !== correctWord);
  
  // Add some words from the same career field
  for (let i = 0; i < Math.min(2, otherWords.length) && distractors.size < 3; i++) {
    const randomWord = otherWords[Math.floor(Math.random() * otherWords.length)];
    distractors.add(randomWord);
  }
  
  // Add some generic professional terms if we need more distractors
  const genericTerms = ['Management', 'Process', 'Procedure', 'Standard', 'Protocol', 'System', 'Method', 'Service', 'Quality', 'Training'];
  for (const term of genericTerms) {
    if (distractors.size < 3 && term !== correctWord) {
      distractors.add(term);
    }
  }
  
  return Array.from(distractors).slice(0, 3);
};

// Generate career-based vocabulary questions (MCQ format)
export const generateCareerQuestion = (difficulty: DifficultyLevel, career?: CareerType, customCareerName?: string): Question => {
  const careerWords = {
    [CareerType.LAW]: [
      'Plaintiff', 'Defendant', 'Litigation', 'Statute', 'Subpoena', 
      'Verdict', 'Deposition', 'Affidavit', 'Jurisdiction', 'Appeal',
      'Counsel', 'Bail', 'Contract', 'Breach', 'Indictment',
      'Notary', 'Testimony', 'Habeas corpus', 'Injunction', 'Settlement'
    ],
    [CareerType.IT]: [
      'Algorithm', 'Debug', 'Compile', 'Runtime', 'Firewall',
      'Cloud', 'API', 'Framework', 'Encryption', 'Cache',
      'Kernel', 'SQL', 'GUI', 'Protocol', 'Repository',
      'DNS', 'Patch', 'Bandwidth', 'Load balancer', 'Server'
    ],
    [CareerType.AVIATION]: [
      'Cockpit', 'Taxiway', 'Runway', 'Altitude', 'Airspeed',
      'Turbulence', 'Descent', 'ATC', 'Black box', 'Mayday',
      'Checklist', 'Autopilot', 'Flaps', 'Gear down', 'Ground control',
      'Approach', 'Clearance', 'Cabin pressure', 'Jet lag', 'Airframe'
    ],
    [CareerType.MEDICAL]: [
      'Diagnosis', 'Prognosis', 'Triage', 'Chart', 'Prescription',
      'Dosage', 'Vital signs', 'Pulse', 'ICU', 'ER',
      'Surgery', 'Anesthesia', 'Biopsy', 'Pathology', 'Radiology',
      'Vaccine', 'Epidemic', 'Syndrome', 'Scan', 'Therapy'
    ],
    [CareerType.POLICE]: [
      'Arrest', 'Booking', 'Citation', 'Detain', 'Interrogation',
      'Miranda Rights', 'Patrol', 'Probable Cause', 'Search Warrant', 'Surveillance',
      'Undercover', 'Stakeout', 'Raid', 'Bust', 'Hot Pursuit',
      'Perpetrator', 'Suspect', 'Witness Statement', 'Affidavit', 'Subpoena',
      'Lineup', 'Mugshot', 'Fingerprinting', 'Evidence Collection', 'Chain of Custody',
      'Crime Scene', 'Forensics', 'Ballistics', 'Autopsy', 'Coroner',
      'Homicide', 'Assault', 'Battery', 'Burglary', 'Robbery',
      'Theft', 'Grand Larceny', 'Embezzlement', 'Fraud', 'Forgery',
      'Arson', 'Kidnapping', 'Extortion', 'Bribery', 'Perjury',
      'Obstruction of Justice', 'Resisting Arrest', 'Disorderly Conduct', 'Public Intoxication', 'Loitering',
      'Handcuffs', 'Baton', 'Taser', 'Pepper Spray', 'Ballistic Vest', 'Duty Belt'
    ],
    [CareerType.CUSTOM]: [
      'Professional', 'Skills', 'Experience', 'Training', 'Expertise',
      'Quality', 'Service', 'Customer', 'Project', 'Goal',
      'Achievement', 'Success', 'Challenge', 'Solution', 'Innovation',
      'Leadership', 'Teamwork', 'Communication', 'Planning', 'Results'
    ]
  };

  // Career definitions for higher difficulty questions
  const careerDefinitions: { [key: string]: { [word: string]: string } } = {
    [CareerType.LAW]: {
      'Plaintiff': 'A person who brings a case against another in a court of law',
      'Defendant': 'An individual accused or sued in a court of law',
      'Litigation': 'The process of taking legal action',
      'Subpoena': 'A legal document ordering someone to attend court',
      'Verdict': 'A decision on an issue of fact in a civil or criminal case',
      'Jurisdiction': 'The official power to make legal decisions and judgments'
    },
    [CareerType.IT]: {
      'Algorithm': 'A set of rules to be followed in problem-solving operations',
      'Debug': 'The process of finding and resolving defects in computer programs',
      'Firewall': 'A network security system that monitors and controls network traffic',
      'Encryption': 'The process of converting information into a secret code',
      'Protocol': 'A set of rules governing the exchange of data between devices'
    },
    [CareerType.AVIATION]: {
      'Cockpit': 'The area in an aircraft where the pilot controls the plane',
      'Runway': 'A strip of hard ground where aircraft take off and land',
      'Altitude': 'The height of an object above sea level',
      'Turbulence': 'Irregular motion of air causing a bumpy flight',
      'Autopilot': 'A system that automatically controls an aircraft'
    },
    [CareerType.MEDICAL]: {
      'Diagnosis': 'The identification of the nature of an illness',
      'Prognosis': 'The likely course of a medical condition',
      'Triage': 'The assignment of priority for medical treatment',
      'Prescription': 'A doctor\'s written instruction for medicine',
      'Surgery': 'Medical treatment involving an operation'
    },
    [CareerType.POLICE]: {
      'Arrest': 'To take someone into custody for suspected criminal activity',
      'Patrol': 'A routine monitoring of an area by police officers',
      'Surveillance': 'Close observation of a person or group',
      'Evidence': 'Information used to establish facts in a legal investigation',
      'Forensics': 'Scientific methods used to investigate crimes'
    }
  };

  const selectedCareer = career || CareerType.LAW;
  const words = careerWords[selectedCareer];
  const selectedWord = words[Math.floor(Math.random() * words.length)];
  const careerName = customCareerName || selectedCareer.charAt(0).toUpperCase() + selectedCareer.slice(1);
  
  // Generate MCQ options
  const distractors = generateCareerDistractors(selectedWord, words, difficulty);
  const options = [selectedWord, ...distractors];
  
  // Shuffle options
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  
  // Create appropriate question based on difficulty
  let question: string;
  const useDefinition = (difficulty === DifficultyLevel.HARD || difficulty === DifficultyLevel.EXPERT) && 
                       careerDefinitions[selectedCareer] && 
                       careerDefinitions[selectedCareer][selectedWord];
  
  if (useDefinition) {
    question = `In ${careerName}, which term means: "${careerDefinitions[selectedCareer][selectedWord]}"?`;
  } else {
    question = `Which of these is a common term used in ${careerName}?`;
  }
  
  return {
    id: `career_${Date.now()}_${Math.random()}`,
    category: QuestionCategory.CAREER,
    type: QuestionType.MULTIPLE_CHOICE,
    difficulty,
    question,
    correctAnswer: selectedWord,
    options,
    career: selectedCareer,
    hint: `Think about terminology commonly used in ${careerName}`,
    explanation: `"${selectedWord}" is ${useDefinition ? careerDefinitions[selectedCareer][selectedWord].toLowerCase() : `a common term in ${careerName}`}`,
    points: DIFFICULTY_POINTS[difficulty],
  };
};

// Main question generator
export const generateQuestion = (
  category: QuestionCategory,
  difficulty: DifficultyLevel,
  career?: CareerType,
  customCareerName?: string
): Question => {
  switch (category) {
    case QuestionCategory.QUANTITATIVE:
      return generateMathQuestion(difficulty);
    case QuestionCategory.VERBAL:
    case QuestionCategory.VOCABULARY:
      return generateWordQuestion(difficulty);
    case QuestionCategory.CAREER:
      return generateCareerQuestion(difficulty, career, customCareerName);
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

