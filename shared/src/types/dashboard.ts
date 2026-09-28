//Tipos para el Dashboard de Carreras


//Datos para mostrar en el dashboard
export interface BetStatistics {
  won: number;
  lost: number;
  total: number;
  winRatePercentage: number;
}


//Datos por victoria
export interface SnailRaceVictory {
  snailId: string;
  snailName: string;
  victories: number;
  color: string;
}

//Datos para estadística de carreras diaras
export interface DailyRaceStats {
  totalRaces: number;
  date: string;
  snails: SnailRaceVictory[];
}
