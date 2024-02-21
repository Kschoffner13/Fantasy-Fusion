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

  // this function takes in a player id and the irl league and
  // will update the draft model, and will increment the current pick number by 1
  // as well as add the pick time to the pick deadline and save it to the drafty model

  async makePick(playerID, irlLeague) {
    // retrive the draft object
    const original = await DataStore.query(Draft, (c) =>
      c.fantasyleagueID.eq(this.FLID)
    );
    let newdata = null;

    // create the new player drafted object that gets appened to the playersDrafted list
    const newPlayerDrafted = {
      pick: original[0].curentPick + 1,
      playerID: playerID,
      league: irlLeague,
    };

    const oldPlayersDrafted = original[0].playersDrafted["picks"];

    if (oldPlayersDrafted.length === 0) {
      newdata = {
        picks: [newPlayerDrafted],
      };
    } else {
      newdata = oldPlayersDrafted.concat(newPlayerDrafted);
    }

    console.log(newdata);

    const response = await DataStore.save(
      Draft.copyOf(original[0], (updated) => {
        updated["curentPick"] = updated["curentPick"] + 1;
        updated["playersDrafted"] = JSON.stringify(newdata);
      })
    );
  }
}

// notes for of where i left off: need to be ablke to
//append data to end the of the picks sectrion in the awsjson object
// also need to accout for when we need to increment the pickdealine
export default DraftAccessor;
