import { DataStore } from "@aws-amplify/datastore";
import { Team, FantasyLeague } from "../models";
import FLAccessor from "./FLAccessor";

class TeamAccessor {
  constructor(fantasyleagueID, userID) {
    this.fantasyleagueID = fantasyleagueID;
    this.userID = userID;
  }
  // this file serves as a template for querying and saving to the database.
  // Example correction, assuming these methods return Promises

  // getFantasyLeagueID = async () => {
  //   ownerID = await this.getOwnerID();
  //   this.fantasyleagueID = await this.getFantasyLeagueID(ownerID, "id")

  // };

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

  async updateTeam(id, dic) {
    const original = await DataStore.query(Team, (c) =>
      c.and((c) => [c.id.eq(id), c.fantasyleagueID.eq(this.fantasyleagueID)])
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
