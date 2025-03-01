export const POSITIONS = {
  P1: "p1",
  P2: "p2",
} as const;

export type Position = (typeof POSITIONS)[keyof typeof POSITIONS];

export interface Log {
  timestamp: string;
  action: string;
}
