import { DataStore } from "@aws-amplify/datastore";
import { FantasyLeague } from "../models";

class FLAccessor {
  // I want to chnage this so it just gets the users id automatically but its not working porperly
  constructor(ownerID) {
    this.ownerID = ownerID;
  }

  // gets the owners id
  getOwnerID() {
    return this.userID;
  }

  // this function will take in the dictonry of values and save them to the users fantasy league
  async saveFantasyLeague(
    Name,
    Properties,
    DraftDate,
    TradeDeadline,
    PlayoffStartDate,
    PlayoffTeams,
    PlayoffMatchupLength,
    WeeklyPickups,
    VetoVoteEnabled,
    Schedule
  ) {
    const dic = {
      Name: Name,
      OwnerID: this.ownerID,
      Properties: JSON.stringify(Properties),
      DraftDate: new Date(DraftDate).toISOString(),
      TradeDeadline: new Date(TradeDeadline).toISOString(),
      PlayoffStartDate: new Date(PlayoffStartDate).toISOString(),
      PlayoffTeams: PlayoffTeams,
      PlayoffMatchupLength: PlayoffMatchupLength,
      WeeklyPickups: WeeklyPickups,
      VetoVoteEnabled: VetoVoteEnabled,
      Schedule: JSON.stringify(Schedule),
    };
    const response = await DataStore.save(new FantasyLeague(dic));
    return response;
  }

  // modify an existing fantasy league
  async updateFantasyLeague(
    id,
    {
      Name = null,
      Properties = null,
      DraftDate = null,
      TradeDeadline = null,
      PlayoffStartDate = null,
      PlayoffTeams = null,
      PlayoffMatchupLength = null,
      WeeklyPickups = null,
      VetoVoteEnabled = null,
      Schedule = null,
    } = {}
  ) {
    const original = await await DataStore.query(FantasyLeague, (c) =>
      c.and((c) => [c.id.eq(id), c.OwnerID.eq(this.ownerID)])
    );

    const dic = {
      Name: Name,
      Properties: Properties ? JSON.stringify(Properties) : null,
      DraftDate: new Date(DraftDate).toISOString(),
      TradeDeadline: new Date(TradeDeadline).toISOString(),
      PlayoffStartDate: new Date(PlayoffStartDate).toISOString(),
      PlayoffTeams: PlayoffTeams,
      PlayoffMatchupLength: PlayoffMatchupLength,
      WeeklyPickups: WeeklyPickups,
      VetoVoteEnabled: VetoVoteEnabled,
      Schedule: Schedule ? JSON.stringify(Schedule) : null,
    };

    const response = await DataStore.save(
      FantasyLeague.copyOf(original[0], (updated) => {
        for (const key in dic) {
          if (
            dic[key] !== updated[key] &&
            key !== "OwnerID" &&
            key !== "id" &&
            dic[key] !== null
          ) {
            updated[key] = dic[key];
          }
        }
      })
    );
  }

  // gets all of the fanatsy leagues owned by a user
  async getFantasyLeagues() {
    const response = await DataStore.query(FantasyLeague, (c) =>
      c.OwnerID.eq(this.ownerID)
    );
    return response;
  }

  // get a specifc fantasy league by id
  async getFantasyLeague(id) {
    const response = await DataStore.query(FantasyLeague, (c) => c.id.eq(id));
    return response[0];
  }

  // this funtion can be used to retrive a specifc attribute from the fanatasy leauge.
  // note must both be in double quotes
  async getFantasyLeagueAttribute(ID, attribute) {
    const response = await DataStore.query(FantasyLeague, (c) =>
      c.and((c) => [c.id.eq(ID), c.OwnerID.eq(this.ownerID)])
    );
    return response[0][attribute];
  }
}

export default FLAccessor;
