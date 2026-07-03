export interface Player {
  name: string;
  score: number;
  avatar: string; // emoji or designator
}

export type GameStage =
  | 'intro'
  | 'stage1'
  | 'stage2'
  | 'stage3'
  | 'stage4'
  | 'stage5'
  | 'quiz'
  | 'results';

export interface GameState {
  stage: GameStage;
  gor: Player;
  gayane: Player;
  activePlayer: 'gor' | 'gayane';
  completedStages: Record<GameStage, boolean>;
}
