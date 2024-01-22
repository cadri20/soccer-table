import {Season} from '../season';

describe('Season', () => {
    let season: Season;
    beforeEach(() => {
        season = new Season('2019/20', [], true, true);
        season.addMatch(0, {team1: "Ultimate Mostoles", team2: "Rayo de Barcelona", score1: 1, score2: 1, penaltiesWinner: "Ultimate Mostoles"});
        season.addMatch(0, {team1: "El Barrio", team2: "Jijantes", score1: 2, score2: 3});
        season.addMatch(0, {team1: "Kunisports", team2: "XBuyer", score1: 2, score2: 3});
        season.addMatch(0, {team1: "Aniquiladores", team2: "Troncos", score1: 1, score2: 2})
        season.addMatch(0, {team1: "1K", team2: "PIO", score1: 8, score2: 2})
        season.addMatch(0, {team1: "Porcinos", team2: "Saiyans", score1: 2, score2: 2, penaltiesWinner: "Saiyans"})
        season.printLeaderboardTable();
    });

    it('should have a ordered leaderboard', () => {
        const leaderboard = season.getLeaderboard();
        //console.log(JSON.stringify(leaderboard))
        expect(leaderboard.standings[0].team).toBe("1K");
        expect(leaderboard.standings[1].team).toBe("Jijantes");
        expect(leaderboard.standings[2].team).toBe("XBuyer");
        expect(leaderboard.standings[3].team).toBe("Troncos");
        expect(leaderboard.standings[4].team).toBe("Saiyans");
        expect(leaderboard.standings[5].team).toBe("Ultimate Mostoles");
        expect(leaderboard.standings[6].team).toBe("Porcinos");
        expect(leaderboard.standings[7].team).toBe("Rayo de Barcelona");
        expect(leaderboard.standings[9].team).toBe("Kunisports");
        expect(leaderboard.standings[8].team).toBe("El Barrio");
        expect(leaderboard.standings[10].team).toBe("Aniquiladores");
        expect(leaderboard.standings[11].team).toBe("PIO");
    });
    it('teams should have correct wins', () => {
        const leaderboard = season.getLeaderboard();
        expect(leaderboard.standings[0].won).toBe(1);
        expect(leaderboard.standings[1].won).toBe(1);
        expect(leaderboard.standings[2].won).toBe(1);
        expect(leaderboard.standings[3].won).toBe(1);
        expect(leaderboard.standings[4].won).toBe(0);
        expect(leaderboard.standings[5].won).toBe(0);
    });
    it('Team 6 should have correct points', () => {
        const leaderboard = season.getLeaderboard();
        expect(leaderboard.standings[0].points).toBe(3);
        expect(leaderboard.standings[1].points).toBe(3);
        expect(leaderboard.standings[2].points).toBe(3);
        expect(leaderboard.standings[3].points).toBe(3);
        expect(leaderboard.standings[4].points).toBe(2);
        expect(leaderboard.standings[5].points).toBe(2);
        expect(leaderboard.standings[6].points).toBe(1);
        expect(leaderboard.standings[7].points).toBe(1);
        expect(leaderboard.standings[8].points).toBe(0);
    });
}
)