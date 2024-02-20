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

  // gets the users fanbtasy league object in its entirety
  async getFantasyLeague() {
    const response = await DataStore.query(FantasyLeague, (c) =>
      c.OwnerID.eq(this.ownerID)
    );
    console.log(response);
    return response;
  }

  // gets the users fantasy league id
  async getFantasyLeagueID() {
    const response = await DataStore.query(FantasyLeague, (c) =>
      c.OwnerID.eq(this.ownerID)
    );
    return response[0].id;
  }

  // gets the users fantasy league name, should be a string
  async getFantasyLeagueName() {
    const response = await DataStore.query(FantasyLeague, (c) =>
      c.OwnerID.eq(this.ownerID)
    );
    return response[0].Name;
  }

  // gets the users fantasy league properties, should be a json object
  async getFantasyLeagueProperties() {
    const response = await DataStore.query(FantasyLeague, (c) =>
      c.OwnerID.eq(this.ownerID)
    );
    return response[0].Properties;
  }
}

export default FLAccessor;
