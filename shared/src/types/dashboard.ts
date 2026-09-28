/**
 * Tipos para el Dashboard de Carreras de Caracoles
 */

export interface BetStatistics {
  won: number;
  lost: number;
  total: number;
  winRatePercentage: number;
}

export interface SnailRaceVictory {
  snailId: string;
  snailName: string;
  victories: number;
  color: string;
}

export interface DailyRaceStats {
  totalRaces: number;
  date: string;
  snails: SnailRaceVictory[];
}
