import React from 'react';

export type Game = 'lol';

export interface Team {
  name: string;
  logo: React.ReactNode;
}

export interface Prediction {
  winner: string;
  confidence: number;
  oddsA: number;
  oddsB: number;
}

export interface Bet {
  teamName: string;
  amount: number;
}

export interface Comment {
  id: number;
  text: string;
  predictedTeam: string;
}

export interface Match {
  id: number;
  game: Game;
  teamA: Team;
  teamB: Team;
  matchTime: Date;
  status: 'upcoming' | 'predicting' | 'finished';
  prediction?: Prediction;
  winner?: string;
  bet?: Bet;
  comments?: Comment[];
  streamUrl?: string;
}