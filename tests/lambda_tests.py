import unittest
import requests
import json


class TestLambda(unittest.TestCase):

    # Tests for nhl_get_player
    def test_nhl_get_player_valid(self):
        response = requests.get("https://qhraq82lr4.execute-api.ca-central-1.amazonaws.com/dev/?id=NHL8474150").json()
        response_code = response['statusCode']
        response_body = json.loads(response['body'])

        expected_code = 200
        expected_body_name = 'Mikael Backlund'

        self.assertEqual(response_code, expected_code, 'Status Code value did not match expected Status Code value')
        self.assertEqual(response_body['name'], expected_body_name, 'Player Name value did not match expected Player Name value')

    # Tests for nba_get_player
    def test_nba_get_player_valid(self):
        response = requests.get("https://h08m2lshuh.execute-api.ca-central-1.amazonaws.com/dev/NBAjamesle01").json()
        response_code = response['statusCode']
        response_body = json.loads(response['body'])

        expected_code = 200
        expected_body_name = 'LeBron James'

        self.assertEqual(response_code, expected_code, 'Status Code value did not match expected Status Code value')
        self.assertEqual(response_body['name'], expected_body_name, 'Player Name value did not match expected Player Name value')

    # Tests for nhl_get_career_stats
    def test_nhl_get_career_stats_valid(self):
        response = requests.get("https://v18r7qllfj.execute-api.ca-central-1.amazonaws.com/dev/?fantasy_id=46a4527d-c260-48a1-9b0c-9dacd08e0d8c").json()
        response_code = response['statusCode']
        response_body = json.loads(response['body'])

        expected_code = 200
        expected_body_name = 'Leo Carlsson'

        self.assertEqual(response_code, expected_code, 'Status Code value did not match expected Status Code value')
        self.assertEqual(response_body[0]['name'], expected_body_name, 'First Player Name value did not match expected First Player Name value')

    # Tests for nba_get_career_stats
    def test_nba_get_career_stats_valid(self):
        response = requests.get("https://mhiakrcyoj.execute-api.ca-central-1.amazonaws.com/dev/?fantasy_id=46a4527d-c260-48a1-9b0c-9dacd08e0d8c").json()
        response_code = response['statusCode']
        response_body = json.loads(response['body'])

        expected_code = 200
        expected_body_name = 'Dante Exum'

        self.assertEqual(response_code, expected_code, 'Status Code value did not match expected Status Code value')
        self.assertEqual(response_body[1]['name'], expected_body_name, 'Second Player Name value did not match expected Second Player Name value')
    
    # Tests for get_roster_stats
    def test_get_roster_stats_valid(self):
        nhl_id = 'NHL8474150'
        nba_id = 'NBAhardati02'
        response = requests.get(f'https://m3nosbczqoii3uygdwrpx4djbq0eakbp.lambda-url.ca-central-1.on.aws/?date=2024-03-27&roster=["{nhl_id}","{nba_id}"]').json()
        response_player_one_id = response[0]['player_id']
        response_player_two_id = response[1]['player_id']

        self.assertEqual(response_player_one_id, nhl_id, 'NHL Player ID value did not match expected NHL Player ID value')
        self.assertEqual(response_player_two_id, nba_id, 'NBA Player ID value did not match expected NBA Player ID value')
        self.assertEqual(response[0]['stats']['date'], '2024-03-27', 'Date value did not match expected Date value')

if __name__ == '__main__':
    unittest.main()
