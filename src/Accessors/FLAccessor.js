import { DataStore } from "@aws-amplify/datastore";
import { FantasyLeague, Team } from "../models";


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
    const original = await DataStore.query(FantasyLeague, (c) =>
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

  // returns true if the player is drafted in the league
  async checkIfPlayerDrafted(playerID, leagueID) {
    console.log(leagueID);
    const teams = await DataStore.query(Team, (c) =>
      c.fantasyleagueID.eq(leagueID)
    );

    for (let i = 0; i < teams.length; i++) {
      const lineup = teams[i]["Lineup"];
      for (const key in lineup) {
        if (lineup[key] === playerID) {
          return true;
        }
      }
    }

    return false;
  }


// leagueID = String
// startDate = Date object
// endDate = new Date(YYYY, MM, DD) <-- ints (for months, start at 0)
  async makeSchedule(LeagueID, startDate, endDate) {
    
    let acutalStartDate = null;
    let actualEndDate = null;
    let weeks = null;
    let numberofTeams = null;
    let numberofMatches = null;
    let Schedule = {};

    // get the actaul start date which needs to be a monday
    for(let i = 0; i < 7; i++) {
      if(startDate.getDay() === 1) {
        acutalStartDate = startDate;
        break;
      }
      startDate.setDate(startDate.getDate() + 1);
    }

    // get the actaul end date which needs to be a sunday
    for(let i = 0; i < 7; i++) {
      if(endDate.getDay() === 0) {
        actualEndDate = endDate;
        break;
      }
      endDate.setDate(endDate.getDate() - 1);
    }
   
   // get the number of weeks
    weeks = Math.ceil((actualEndDate - acutalStartDate) / (1000 * 60 * 60 * 24 * 7)); 
    

    // let date = new Date();
    // date = date.toLocaleString("en-US", {timeZone:'America/Denver', year: 'numeric', month: '2-digit', day: '2-digit'});
    // let [month, day, year] = date.split('/');
    // let formattedDate = `${year}-${month}-${day}`;
    // console.log(formattedDate);

    // get all teams in the league
    let teams = await DataStore.query(Team, (c) => c.fantasyleagueID.eq(LeagueID));
    numberofTeams = teams.length;
    const teamIDs = teams.map((team) => team.id);


    // generate pairs
    let played = {}
    for (let i = 0; i < numberofTeams; i++) {
      played[teamIDs[i]] = [];
    }

    
    // create the schedule
    for(let i = 1; i <= weeks; i++) {
      let week = "Week" + i;
      
      Schedule[week] = [];
      let teamsplayed = [];

      let sDate = new Date(acutalStartDate);
      let eDate = new Date(acutalStartDate - 1);
      sDate.setDate(sDate.getDate() + (7 * (i - 1)));
      eDate.setDate(eDate.getDate() + (7 * i) -1);

      Schedule[week]["StartDate"] = sDate.toISOString().split('T')[0];
      Schedule[week]["EndDate"] = eDate.toISOString().split('T')[0];

      numberofMatches = numberofTeams/2;

      // populate with basic format
      for(let j = 0; j < numberofMatches; j++) {

        let team1 = null;
        let team2 = null

        for (let y = 0; y < numberofTeams; y++) {
          if (!teamsplayed.includes(teams[y].id)) {
            team1 = teams[y].id;
            teamsplayed.push(teams[y].id);
            break;
          }
        }

        // pick the second team
        for (let y = 0; y < numberofTeams; y++) {
          if(played[team1] && !played[team1].includes(teams[y].id) && teams[y].id !== team1) {
            team2 = teams[y].id;
            teamsplayed.push(teams[y].id);
            played[team1].push(teams[y].id);
            break;
          }
        }
        Schedule[week][j] = {"Team1": team1, "Team2": team2, "Score": {"Team1": 0, "Team2": 0}};

      }
    
    }
    
    console.log(Schedule);

    // for (let i = 1; i <= weeks; i++) {

    //   let week = "Week" + i;
    //   let teamsplayed = [];

    //   for(let x = 0; x < numberofMatches; x++) {
    //     let team1 = null;
    //     let team2 = null;

    //     // pick the first team
    //     for (let y = 0; y < numberofTeams; y++) {
    //       if (!teamsplayed.includes(teams[y].id)) {
    //         team1 = teams[y].id;
    //         teamsplayed.push(teams[y].id);
    //         break;
    //       }
    //     }

    //     // pick the second team
    //     for (let y = 0; y < numberofTeams; y++) {
    //       if(played[team1] && !played[team1].includes(teams[y].id)) {
    //         team2 = teams[y].id;
    //         teamsplayed.push(teams[y].id);
    //         played[team1].push(teams[y].id);
    //         break;
    //       }
    //     }
    //     Schedule[week][x]["Team1"] = team1;
    //     Schedule[week][x]["Team2"] = team2;

    //   }
    // }

    console.log(Schedule);
  }
}
export default FLAccessor;





// const sch = {
//   "Week1": [
    
//       "Match1": {
//         "Team1": "Team A",
//         "Team2": "Team B",
//         "Score": {
//           "Team1": 0,
//           "Team2": 0
//         },
//         "StartDate": "2022-01-01",
//         "EndDate": "2022-01-07"
//       },
//       "Match2": {
//         "Team1": "Team C",
//         "Team2": "Team D",
//         "Score": {
//           "Team1": 0,
//           "Team2": 0
//         },
//         "StartDate": "2022-01-01",
//         "EndDate": "2022-01-07"
//       }
    
//   ],
//   "Week2": [
    
//       "Match1": {
//         "Team1": "Team A",
//         "Team2": "Team C",
//         "Score": {
//           "Team A": 0,
//           "Team C": 0
//         },
//         "StartDate": "2022-01-08",
//         "EndDate": "2022-01-14"
//       },
//       "Match2": {
//         "Team1": "Team B",
//         "Team2": "Team D",
//         "Score": {
//           "Team B": 0,
//           "Team D": 0
//         },
//         "StartDate": "2022-01-08",
//         "EndDate": "2022-01-14"
//       }
    
//   ]

// }