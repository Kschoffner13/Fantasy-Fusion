import os
import json
from datetime import datetime, timedelta
import requests
from nba_api.stats.static import players
from nba_api.stats.endpoints import playercareerstats

def handler(event, context):
    file_path = "/tmp/data.json"  # Use /tmp directory for Lambda function

    # Function to check if the file exists and has been modified in the past 7 days
    def file_modified_in_last_7_days(file_path):
        if not os.path.exists(file_path):
            return False

        # Get the current time
        current_time = datetime.now()

        # Get the modification time of the file
        modification_time = datetime.fromtimestamp(os.path.getmtime(file_path))

        # Calculate the difference between the current time and modification time
        time_difference = current_time - modification_time

        # Check if the difference is less than or equal to 7 days
        if time_difference <= timedelta(days=7):
            return True
        else:
            return False

    data = []

    asa = file_modified_in_last_7_days(file_path)
    if not asa:
        all_players = players.get_players()
        for p in all_players:
            id = []

            if p["is_active"]:
                name = p["full_name"]
                print(name)

                career = playercareerstats.PlayerCareerStats(player_id=p["id"])
                x = json.loads(career.get_json())
                if len(x["resultSets"][0]["rowSet"]) > 0:
                    if x["resultSets"][0]["rowSet"][-1][1] == '2023-24':
                        points = x["resultSets"][0]["rowSet"][-1][26]
                        blocks = x["resultSets"][0]["rowSet"][-1][23]
                        steal = x["resultSets"][0]["rowSet"][-1][22]
                        assist = x["resultSets"][0]["rowSet"][-1][21]
                        rebound = x["resultSets"][0]["rowSet"][-1][20]
                        FG3M = x["resultSets"][0]["rowSet"][-1][12]
                        team = x["resultSets"][0]["rowSet"][-1][4]
                        id = x["resultSets"][0]["rowSet"][-1][0]

                        new_data = {
                            "name": name,
                            "points": points,
                            "assist": assist,
                            "rebound": rebound,
                            "block": blocks,
                            "steal": steal,
                            "3PM": FG3M,
                            "team": team,
                            "id": "NBA" + str(id)
                        }

                        data.append(new_data)

        nhl_teams = ["ANA", "ARI", "BOS", "BUF", "CGY", "CAR", "CHI", "COL", "CBJ", "DAL", "DET", "EDM", "FLA", "LAK",
                     "MIN", "MTL", "NSH", "NJD", "NYI", "NYR", "OTT", "PHI", "PIT", "SJS", "STL", "TBL", "TOR", "VAN",
                     "VGK", "WSH", "WPG"]
        id = []
        for i in nhl_teams:
            response = requests.get(f"https://api-web.nhle.com/v1/roster/{i}/20232024")
            resp = json.loads(response.text)
            forwards = resp["forwards"]
            defensemen = resp["defensemen"]
            goalies = resp["goalies"]

            for i in forwards:
                id.append(i["id"])

            for i in defensemen:
                id.append(i["id"])

            for i in goalies:
                id.append(i["id"])

        for j in id:
            if j > 0:
                response = requests.get(f"https://api-web.nhle.com/v1/player/{j}/landing")
                resp = json.loads(response.text)
                if resp["position"] != "G":
                    try:
                        id = resp['playerId']
                        name = resp["firstName"]["default"] + " " + resp["lastName"]["default"]
                        position = resp["position"]
                        points = resp["featuredStats"]["regularSeason"]["subSeason"]["points"]
                        assists = resp["featuredStats"]["regularSeason"]["subSeason"]["assists"]
                        goals = resp["featuredStats"]["regularSeason"]["subSeason"]["goals"]
                        PPP = resp["featuredStats"]["regularSeason"]["subSeason"]["powerPlayPoints"]
                        PIM = resp["featuredStats"]["regularSeason"]["subSeason"]["pim"]
                        team = resp["currentTeamAbbrev"]
                    except:
                        id = resp['playerId']
                        name = resp["firstName"]["default"] + " " + resp["lastName"]["default"]
                        position = resp["position"]
                        points = "N/A"
                        assists = "N/A"
                        goals = "N/A"
                        PPP = "N/A"
                        PIM = "N/A"
                        team = resp["currentTeamAbbrev"]
                else:
                    try:
                        id = resp['playerId']
                        name = resp["firstName"]["default"] + " " + resp["lastName"]["default"]
                        position = resp["position"]
                        points = resp["featuredStats"]["regularSeason"]["subSeason"]["goalsAgainstAvg"]
                        assists = "N/A"
                        goals = "N/A"
                        PPP = "N/A"
                        PIM = "N/A"
                        team = resp["currentTeamAbbrev"]
                    except:
                        id = resp['playerId']
                        name = resp["firstName"]["default"] + " " + resp["lastName"]["default"]
                        position = resp["position"]
                        points = "N/A"
                        assists = "N/A"
                        goals = "N/A"
                        PPP = "N/A"
                        PIM = "N/A"
                        team = resp["currentTeamAbbrev"]

                print(name)

                new_data = {
                    "name": name,
                    "points": points,
                    "assist": assists,
                    "position": position,
                    "goals": goals,
                    "PPP": PPP,
                    "PIM": PIM,
                    "team": team,
                    "id": "NHL" + str(id)
                }

                data.append(new_data)

        with open(file_path, 'w') as file:
            json.dump(data, file, indent=4)

    else:
        with open(file_path, 'r') as file:
            data = json.load(file)

    return data

#handler(None, None)
