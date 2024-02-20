import { DataStore } from "@aws-amplify/datastore";
import { FantasyLeague, Draft } from "../models";

class DraftAccessor {
  // this will take in the idk of the fantasy leauge associated with that id/
  constructor(FLID) {
    this.FLID = FLID;
  }

  async saveDraft(dic) {
    dic["fantasyleagueID"] = this.FLID;
    const response = await DataStore.save(new Draft(dic));
    return response;
  }

  async getDraft() {
    const response = await DataStore.query(Draft, (c) =>
      c.fantasyleagueID.eq(this.FLID)
    );
    return response;
  }

  async getOrder() {
    const response = await DataStore.query(Draft, (c) =>
      c.FantasyLeagueID.eq(this.FLID)
    );
    return response[0].Order;
  }
}
