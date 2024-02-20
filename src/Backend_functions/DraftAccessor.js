import { DataStore } from "@aws-amplify/datastore";
import { FantasyLeague, Draft } from "../models";

class DraftAccessor {
  // this will take in the idk of the fantasy leauge associated with that id/
  constructor(FLID) {
    this.FLID = FLID;
  }

  // will need to make sure that there are no other draft items associated with the same fantasy league
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

  async updateDraft(dic) {
    const original = await DataStore.query(Draft, (c) =>
      c.fantasyleagueID.eq(this.FLID)
    );

    const response = await DataStore.save(
      Draft.copyOf(original[0], (updated) => {
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

  // get any attributes from the draft model. make sure spelling is correct
  async getDraftAttribute(attribute) {
    const response = await DataStore.query(Draft, (c) =>
      c.fantasyleagueID.eq(this.FLID)
    );
    return response[0][attribute];
  }

  async getDraftDate() {
    const response = await DataStore.query(FantasyLeague, (c) =>
      c.id.eq(this.FLID)
    );
    return response[0]["DraftDate"];
  }
}

export default DraftAccessor;
