export interface Question {
  id: string;
  text: string;
  type: 'likert' | 'multiple-choice' | 'binary' | 'scenario';
  options?: string[];
  category: 'interest' | 'personality' | 'cognitive' | 'motivation' | 'aptitude' | 'technical' | 'wiscar';
  framework?: 'big5' | 'holland' | 'grit' | 'growth-mindset';
  weight?: number;
}

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  timeEstimate: number; // in minutes
}

export interface UserResponse {
  questionId: string;
  value: number | string;
  timestamp: Date;
}

export interface SectionScore {
  sectionId: string;
  score: number;
  maxScore: number;
  interpretation: string;
}

export interface WISCARScore {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorld: number;
}

export interface AssessmentResult {
  userId?: string;
  sectionScores: SectionScore[];
  wiscarScore: WISCARScore;
  overallScore: number;
  recommendation: 'yes' | 'maybe' | 'no';
  personalizedFeedback: string;
  nextSteps: string[];
  careerRecommendations: string[];
  learningPath: string;
  completedAt: Date;
}

export interface AssessmentState {
  currentSection: number;
  currentQuestion: number;
  responses: UserResponse[];
  isComplete: boolean;
  result?: AssessmentResult;
}