export interface TestItem {
  id: string;
  tag: string;
  q: string;
  opts: [string, number][];
}

export interface TestState {
  idx: number;
  answers: Record<string, number>;
}

export interface TestResult {
  score: number;
  resultTitle: string;
  resultDesc: string;
  resultTip: string;
  cls: 'low' | 'mid' | 'high';
}
