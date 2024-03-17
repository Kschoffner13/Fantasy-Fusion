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
  async saveTeam(teamData) {
    teamData["fantasyleagueID"] = this.fantasyleagueID;
    teamData["UserID"] = this.userID;

    const message = await DataStore.save(new Team(teamData));
    return message;

    // const response = await DataStore.query(Team);
    // console.log(response);
  }

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

  async updateTeam(teamID, dic) {
    const original = await DataStore.query(Team, (c) =>
      c.and((c) => [
        c.id.eq(teamID),
        c.fantasyleagueID.eq(this.fantasyleagueID),
      ])
    );

    const response = await DataStore.save(
      FantasyLeague.copyOf(original[0], (updated) => {
        for (const key in dic) {
          if (
            dic[key] != updated[key] &&
            key !== "fantasyleagueID" &&
            key !== "id"
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
