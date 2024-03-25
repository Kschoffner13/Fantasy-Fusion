import { DataStore } from "@aws-amplify/datastore";
import { Team, FantasyLeague } from "../models";

class TeamAccessor {
    constructor(fantasyleagueID = null, userID = null) {
        this.fantasyleagueID = fantasyleagueID;
        this.userID = userID;
    }

    // THESE FUNCTIONS CAN ONLY BE USED IF THE LEAGUE AND USERID ARE SPECIFIED IN THE CTOR
    // get all teams for a user
    async getUsersTeams(userID) {
        const teams = await DataStore.query(Team, (c) => c.UserID.eq(userID));
        console.log("ACCESSOR", teams);
        return teams;
    }

    // get all teams for a league
    async getLeaugesTeams(fantasyleagueID) {
        const teams = await DataStore.query(Team, (c) =>
            c.fantasyleagueID.eq(fantasyleagueID)
        );
        return teams;
    }

    // Setter functions
    setFantasyLeagueID(fantasyleagueID) {
        this.fantasyleagueID = fantasyleagueID;
    }

    setUserID(userID) {
        this.userID = userID;
    }

    // OG FUNCTIONS
    // pass in the league id
    async saveTeam(
        Name,
        TotalPointsFor,
        TotalPointsAgainst,
        MatchUpPoints,
        Wins,
        Losses,
        Draws,
        Lineups,
        CurrentLineup
    ) {
        const teamData = {
            Name: Name,
            UserID: this.userID,
            TotalPointsFor: TotalPointsFor,
            TotalPointsAgainst: TotalPointsAgainst,
            MatchUpPoints: MatchUpPoints,
            Wins: Wins,
            Losses: Losses,
            Draws: Draws,
            Lineups: JSON.stringify(Lineups),
            fantasyleagueID: this.fantasyleagueID,
            CurrentLineup: JSON.stringify(CurrentLineup),
        };

        const message = await DataStore.save(new Team(teamData));
        return message;
    }

    // Get all the teams for a user.
    // async getUsersTeams() {
    //     const response = await DataStore.query(Team, (c) =>
    //         c.UserID.eq(this.userID)
    //     );
    //     return response;
    // }

    async getTeams() {
        const posts = await DataStore.query(Team, (c) =>
            c.fantasyleagueID.eq(this.fantasyleagueID)
        );
        return posts;
    }

    async getTeamById(teamId) {
        try {
            const team = await DataStore.query(Team, teamId);
            if (team) {
                console.log("Team found:", team);
                return team;
            } else {
                console.log("Team not found");
                return null;
            }
        } catch (error) {
            console.error("Error retrieving team:", error);
        }
    }

    async deleteTeamById(teamId) {
        try {
            const teamToDelete = await DataStore.query(Team, teamId);
            if (teamToDelete) {
                await DataStore.delete(teamToDelete);
                console.log("Team deleted successfully");
            } else {
                console.log("Team not found, cannot delete");
            }
        } catch (error) {
            console.error("Error deleting team:", error);
        }
    }

    async updateTeam(
        teamID,
        {
            Name = null,
            TotalPointsFor = null,
            TotalPointsAgainst = null,
            MatchUpPoints = null,
            Wins = null,
            Losses = null,
            Draws = null,
            CurrentLineup = null,
            Lineups = null,
        } = {}
    ) {
        const original = await DataStore.query(Team, (c) => c.id.eq(teamID));

        console.log("Original:", original);

        const dic = {
            Name: Name,
            TotalPointsFor: TotalPointsFor,
            TotalPointsAgainst: TotalPointsAgainst,
            MatchUpPoints: MatchUpPoints,
            Wins: Wins,
            Losses: Losses,
            Draws: Draws,
            Lineups: Lineups ? JSON.stringify(Lineups) : null,
            CurrentLineup: CurrentLineup ? JSON.stringify(CurrentLineup) : null,
        };

        console.log("Dic:", dic);

        const response = await DataStore.save(
            Team.copyOf(original[0], (updated) => {
                for (const key in dic) {
                    if (
                        dic[key] !== updated[key] &&
                        key !== "fantasyleagueID" &&
                        key !== "id" &&
                        dic[key] !== null
                    ) {
                        updated[key] = dic[key];
                    }
                }
            })
        );
    }

    async getTeamAttribute(ID, attribute) {
        const response = await DataStore.query(Team, (c) =>
            c.and((c) => [
                c.id.eq(ID),
                c.fantasyleagueID.eq(this.fantasyleagueID),
                c.UserID.eq(this.userID),
            ])
        );
        return response[0][attribute];
    }

    async updateTeam(
        teamID,
        {
            Name = null,
            TotalPointsFor = null,
            TotalPointsAgainst = null,
            MatchUpPoints = null,
            Wins = null,
            Losses = null,
            Draws = null,
            Roster = null,
            PlayerList = null,
            Lineup = null,
        } = {}
    ) {
        const original = await DataStore.query(Team, (c) => c.id.eq(teamID));

        console.log("Original:", original);

        //   console.log("Team", team);
        //   // const lineups = team["Lineups"];

        console.log("Dic:", dic);

        const response = await DataStore.save(
            Team.copyOf(original[0], (updated) => {
                for (const key in dic) {
                    if (
                        dic[key] !== updated[key] &&
                        key !== "fantasyleagueID" &&
                        key !== "id" &&
                        dic[key] !== null
                    ) {
                        updated[key] = dic[key];
                    }
                }
            })
        );
    }

    async getTeamAttribute(ID, attribute) {
        const response = await DataStore.query(Team, (c) =>
            c.and((c) => [
                c.id.eq(ID),
                c.fantasyleagueID.eq(this.fantasyleagueID),
                c.UserID.eq(this.userID),
            ])
        );
        return response[0][attribute];
    }
}

export default TeamAccessor;
