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
  async saveFantasyLeague(dic) {
    dic["OwnerID"] = this.ownerID;
    const response = await DataStore.save(new FantasyLeague(dic));
    return response;
  }

  // modify an existing fantasy league
  async updateFantasyLeague(id, dic) {
    const original = await DataStore.query(FantasyLeague, (c) =>
      c.and((c) => [c.id.eq(id), c.OwnerID.eq(this.ownerID)])
    );

    const response = await DataStore.save(
      FantasyLeague.copyOf(original[0], (updated) => {
        for (const key in dic) {
          if (dic[key] != updated[key] && key !== "OwnerID" && key !== "id") {
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
    const response = await DataStore.query(FantasyLeague, (c) =>
      c.and((c) => [c.id.eq(id), c.OwnerID.eq(this.ownerID)])
    );
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

