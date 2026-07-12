// 1. Define supported athletic categories
export type SportType = 'FOOTBALL' | 'CRICKET' | 'BASKETBALL';

// 2. Base interface for any match score state
export interface BaseScoreMetadata {
  updatedAt: Date;
  isFinished: boolean;
}

// 3. Sport-specific detailed metrics
export interface FootballScore extends BaseScoreMetadata {
  goals: number;
  yellowCards: number;
  redCards: number;
}

export interface CricketScore extends BaseScoreMetadata {
  runs: number;
  wickets: number;
  overs: number;
  target?: number;
}

export interface BasketballScore extends BaseScoreMetadata {
  points: number;
  quarter: 1 | 2 | 3 | 4;
}

// 4. A flexible dynamic union type for the database JSON structures
export type LiveMatchScore = FootballScore | CricketScore | BasketballScore;
