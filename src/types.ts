export interface RoadmapStep {
  phase: string;
  weeklyAction: string;
  focusGoal: string;
}

export interface PlanResponse {
  coreSubjects: string[];
  roadmap: RoadmapStep[];
  successTip: string;
  cheerMessage: string;
}

export interface SummaryResponse {
  conceptName: string;
  simpleDefinition: string;
  analogy: string;
  keyPoints: string[];
  secretFormula: string;
}

export interface MockQuestion {
  questionText: string;
  options: string[];
  correctAnswerIdx: number;
  explanation: string;
}

export interface QuestionsResponse {
  questions: MockQuestion[];
}

export type ExamCategory = "civil" | "public" | "certificate";
