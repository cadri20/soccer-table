export interface Team{
    name: string;
    image: string;
}

export interface Match{
    team1: string;
    team2: string;
    score1: number;
    score2: number;
    penaltiesWinner?: string;
}

export interface MatchDay{
    matchdayNumber: number;
    matches: Match[];
}

export interface Standing{
    team: string;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    penaltyWins?: number;
    penaltyLosses?: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    points: number;
}

export interface Leaderboard{
    season: string;
    standings: Standing[]
}