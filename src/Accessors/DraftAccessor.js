import { DataStore } from "@aws-amplify/datastore";
import { FantasyLeague, Draft } from "../models";
import { dblClick } from "@testing-library/user-event/dist/click";

class DraftAccessor {
  // this will take in the idk of the fantasy leauge associated with that id/
  constructor(FLID) {
    this.FLID = FLID;
  }

  // will need to make sure that there are no other draft items associated with the same fantasy league
  async saveDraft(order, pickDealine, currentPick, playersDrafted) {
    dic = {
      fantasyleagueID: this.FLID,
      order: order,
      pickDealine: pickDealine,
      currentPick: currentPick,
      playersDrafted: JSON.stringify(playersDrafted),
    };


    const response = await DataStore.save(new Draft(dic));
    return response;
  }

  async getDraft() {
    const response = await DataStore.query(Draft, (c) =>
      c.fantasyleagueID.eq(this.FLID)
    );
    return response;
  }

  async updateDraft({ oder = null, pickDeadline = null, currentPick = null, playersDrafted = null } = {}) {
    const original = await DataStore.query(Draft, (c) =>
      c.fantasyleagueID.eq(this.FLID)
    );

    dic = {
      fantasyleagueID: this.FLID,
      order: order,
      pickDeadline: pickDeadline,
      currentPick: currentPick,
      playersDrafted: playersDrafted ? JSON.stringify(playersDrafted) : null,
    };

    const response = await DataStore.save(
      Draft.copyOf(original[0], (updated) => {
        for (const key in dic) {
          if (
            dic[key] != updated[key] &&
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

    // array to be used for the new playersDrafted object
    let newdata = null;

    // create the new player drafted object that gets appened to the playersDrafted list
    const newPlayerDrafted = {
      pick: original[0].curentPick + 1,
      playerID: playerID,
      league: irlLeague,
    };

    // retive the old playersdrafted
    const oldPlayersDrafted = original[0].playersDrafted["picks"];

    // if its null, submit new data
    if (oldPlayersDrafted.length === 0) {
      newdata = {
        picks: [newPlayerDrafted],
      };
    } else {
      // if its not null, add new data
      newdata = oldPlayersDrafted.concat(newPlayerDrafted);
    }

    // update the draft model
    const response = await DataStore.save(
      Draft.copyOf(original[0], (updated) => {
        updated["curentPick"] = updated["curentPick"] + 1;
        updated["playersDrafted"] = JSON.stringify(newdata);
      })
    );
  }
}

// also need to accout for when we need to increment the pickdealine
export default DraftAccessor;
