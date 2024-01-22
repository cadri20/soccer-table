import { Leaderboard, Match, MatchDay, Standing } from "./interfaces";

export class Season{
    

    constructor(
        private name: string, 
        private matchDays: MatchDay[],
        private penalties: boolean,
        private equalPenaltiesPoints: boolean
        ) {
        this.name = name;
    }

    addMatch(matchDay: number, match: Match){
        const matchDayIndex = this.matchDays.findIndex(matchDayElement => matchDayElement.matchdayNumber === matchDay);
        if(matchDayIndex === -1){
            this.matchDays.push({
                matchdayNumber: matchDay,
                matches: [match]
            });
        }
        else{
            this.matchDays[matchDayIndex].matches.push(match);
        }
    }

    getLeaderboard(): Leaderboard{
        const standings: Standing[] = [];
        this.teams.forEach(team => {
            standings.push(this.getStanding(team));
        });

        this.sortLeaderboard(standings);

        return {
            season: this.name,
            standings
        }

    }

    private sortLeaderboard(standings: Standing[]){
        standings.sort((a, b) => {
            if(a.points > b.points){
                return -1;
            }
            if(a.points < b.points){
                return 1;
            }
            if(a.goalDifference > b.goalDifference){
                return -1;
            }
            if(a.goalDifference < b.goalDifference){
                return 1;
            }
            if(a.goalsFor > b.goalsFor){
                return -1;
            }
            if(a.goalsFor < b.goalsFor){
                return 1;
            }
            return 0;
        });
    }

    printLeaderboardTable(): void{
        const leaderboard = this.getLeaderboard();
        console.log(leaderboard.season);
        if(this.penalties){
            console.log("Team\t\t\tPoints\tPlayed\tWon\tPenalty Wins\tPenalty Losses\tLost\tGF\tGA\tGD")
        }else{
            console.log("Team\t\t\tPoints\tPlayed\tWon\tDrawn\tLost\tGF\tGA\tGD");
        }
        leaderboard.standings.forEach(standing => {
            if(this.penalties){
                console.log(`${standing.team}\t\t\t${standing.points}\t${standing.played}\t${standing.won}\t${standing.penaltyWins}\t${standing.penaltyLosses}\t${standing.lost}\t${standing.goalsFor}\t${standing.goalsAgainst}\t${standing.goalDifference}`);
            }else{
                console.log(`${standing.team}\t\t\t${standing.points}\t${standing.played}\t${standing.won}\t${standing.drawn}\t${standing.lost}\t${standing.goalsFor}\t${standing.goalsAgainst}\t${standing.goalDifference}`);
            }
            
        });
    }

    private getStanding(team: string): Standing{
        const played = this.getMatchesPlayed(team);
        const won = this.getMatchesWon(team);
        const penaltyWins = this.getPenaltyWins(team);
        const penaltyLosses = this.getPenaltyLosses(team);
        const drawn = this.getMatchesDrawn(team);
        const lost = this.getMatchesLost(team);
        const goalsFor = this.getGoalsFor(team);
        const goalsAgainst = this.getGoalsAgainst(team);
        const goalDifference = this.getGoalDifference(team);
        const points = this.getPoints(team);
        
        const standing: Standing =  {
            team,
            played,
            won,
            drawn,
            lost,
            goalsFor,
            goalsAgainst,
            goalDifference,
            points
        }

        if(this.penalties){
            standing.penaltyWins = penaltyWins
            standing.penaltyLosses = penaltyLosses;
        }
        return standing
    }

    private getMatchesPlayed(team: string): number{
        let played = 0;
        this.matchDays.forEach(matchDay => {
            matchDay.matches.forEach(match => {
                if(match.team1 === team || match.team2 === team){
                    played++;
                }
            });
        });
        return played;
    }

    private getMatchesWon(team: string): number{
        let won = 0;
        for(let matchDay of this.matchDays){
            for(let match of matchDay.matches){
                if(match.team1 === team && match.score1 > match.score2){
                    won++;
                }
                if(match.team2 === team && match.score2 > match.score1){
                    won++;
                }
            }
        }
        return won;
    }

    private getPenaltyWins(team: string): number{
        let penaltyWins = 0;
        if(this.penalties){
            for(let matchDay of this.matchDays){
                for(let match of matchDay.matches){
                    if(match.penaltiesWinner == team){
                        penaltyWins++;
                    }
                }
            }
        }
        return penaltyWins;
    }

    private getPenaltyLosses(team: string): number{
        let penaltyLosses = 0;
        if(this.penalties){
            for(let matchDay of this.matchDays){
                for(let match of matchDay.matches){
                    if(match.score1 == match.score2 && (match.team1 == team || match.team2 == team) && match.penaltiesWinner != team){
                        penaltyLosses++;
                    }
                }
            }
        }
        return penaltyLosses;
    }

    private getMatchesDrawn(team: string): number{
        let drawn = 0;
        this.matchDays.forEach(matchDay => {
            matchDay.matches.forEach(match => {
                if((match.team1 === team || match.team2 === team) && match.score1 === match.score2){
                    drawn++;
                }
            });
        });
        return drawn;
    }

    private getMatchesLost(team: string): number{
        let lost = 0;
        this.matchDays.forEach(matchDay => {
            matchDay.matches.forEach(match => {
                if(match.team1 === team && match.score1 < match.score2){
                    lost++;
                }
                if(match.team2 === team && match.score2 < match.score1){
                    lost++;
                }
            });
        });
        return lost;
    }

    private getGoalsFor(team: string): number{
        let goalsFor = 0;
        this.matchDays.forEach(matchDay => {
            matchDay.matches.forEach(match => {
                if(match.team1 === team){
                    goalsFor += match.score1;
                }
                if(match.team2 === team){
                    goalsFor += match.score2;
                }
            });
        });
        return goalsFor;
    }

    private getGoalsAgainst(team: string): number{
        let goalsAgainst = 0;
        this.matchDays.forEach(matchDay => {
            matchDay.matches.forEach(match => {
                if(match.team1 === team){
                    goalsAgainst += match.score2;
                }
                if(match.team2 === team){
                    goalsAgainst += match.score1;
                }
            });
        });
        return goalsAgainst;
    }

    private getGoalDifference(team: string): number{
        return this.getGoalsFor(team) - this.getGoalsAgainst(team);
    }

    private getPoints(team: string): number{
        if(this.penalties){
            if(this.equalPenaltiesPoints){
                //If won in penalty shootout, add 2 points, if lose in penalty shootout, add 1 point
                return this.getMatchesWon(team) * 3 + this.getPenaltyWins(team) * 2 + this.getPenaltyLosses(team);
            }else{
                return this.getMatchesWon(team) * 3 + this.getPenaltyWins(team);
            }
        }else{
            return this.getMatchesWon(team) * 3 + this.getMatchesDrawn(team)
        }
        
    }


    private get teams(): string[]{
        let teams: string[] = [];
        this.matchDays.forEach(matchDay => {
            matchDay.matches.forEach(match => {
                if(!teams.includes(match.team1)){
                    teams.push(match.team1);
                }
                if(!teams.includes(match.team2)){
                    teams.push(match.team2);
                }
            });
        });
        return teams;
    }


    

    
    

}