const FLAccessor =  require('../src/Accessors/FLAccessor').default;
const { DataStore } = require('@aws-amplify/datastore');


jest.mock('@aws-amplify/datastore', () => {
  const mockCopyOf = jest.fn((original, updater) => {
    const updated = { ...original };
    updater(updated);
    return updated;
  });

  return {
    DataStore: {
      query: jest.fn(),
      save: jest.fn(),
      // Assuming delete might be needed in future tests
      delete: jest.fn(),
    },
    initSchema: jest.fn().mockImplementation(() => ({
      FantasyLeague: class MockFantasyLeague {
        static copyOf = mockCopyOf
      },
    })),
  };
});

// Global variables or mock data used across tests
const ownerID = 'owner1'; // Example owner ID

it('should save a fantasy league with the correct owner ID', async () => {
    const flAccessor = new FLAccessor(ownerID);
    const Owner = ownerID; 
    const Name = 'My Fantasy League';
    const Properties = {}; // Assuming Properties is an object
    const DraftDate = '2023-01-01T00:00:00Z';
    const TradeDeadline = '2023-02-01T00:00:00Z';
    const PlayoffStartDate = '2023-03-01T00:00:00Z';
    const PlayoffTeams = 8;
    const PlayoffMatchupLength = 1;
    const WeeklyPickups = null;
    const VetoVoteEnabled = true;
    const Schedule = {}; // Assuming Schedule is an object

    DataStore.save.mockResolvedValue({
      OwnerID: ownerID, // Make sure to include this in the resolved value
      Name,
      Properties: JSON.stringify(Properties),
      DraftDate,
      TradeDeadline,
      PlayoffStartDate,
      PlayoffTeams,
      PlayoffMatchupLength,
      WeeklyPickups,
      VetoVoteEnabled,
      Schedule: JSON.stringify(Schedule),
    });
  
    const result = await flAccessor.saveFantasyLeague(Name,
      Properties,
      DraftDate,
      TradeDeadline,
      PlayoffStartDate,
      PlayoffTeams,
      PlayoffMatchupLength,
      WeeklyPickups,
      VetoVoteEnabled,
      Schedule);
  
    expect(DataStore.save).toHaveBeenCalledWith(expect.anything());
    expect(result.OwnerID).toBe(ownerID);
  });
  
  it('should update a fantasy league with new values', async () => {
    const flAccessor = new FLAccessor(ownerID);
    const leagueId = 'league1';
    const changes = { name: 'Updated Name' };
    const originalLeague = { id: leagueId, name: 'Original Name', OwnerID: ownerID };
  
    // Mock the query to return the original league
    DataStore.query.mockResolvedValue([originalLeague]);
    DataStore.save.mockImplementation(require('@aws-amplify/datastore').mockCopyOf);
  
    await flAccessor.updateFantasyLeague(leagueId, changes);
  
    expect(DataStore.save).toHaveBeenCalled();
  });

  it('should retrieve all fantasy leagues owned by the user', async () => {
    const flAccessor = new FLAccessor(ownerID);
    const leagues = [
      { id: 'league1', name: 'League One', OwnerID: ownerID },
      { id: 'league2', name: 'League Two', OwnerID: ownerID }
    ];
  
    DataStore.query.mockResolvedValue(leagues);
  
    const result = await flAccessor.getFantasyLeagues();
  
    expect(DataStore.query).toHaveBeenCalledWith(expect.anything(), expect.anything());
    expect(result).toEqual(leagues);
  });

  it('should retrieve a specific fantasy league by ID', async () => {
    const flAccessor = new FLAccessor(ownerID);
    const league = { id: 'league1', name: 'League One', OwnerID: ownerID };
  
    DataStore.query.mockResolvedValue([league]);
  
    const result = await flAccessor.getFantasyLeague('league1');
  
    expect(DataStore.query).toHaveBeenCalledWith(expect.anything(), expect.anything());
    expect(result).toEqual(league);
  });
  
  it('should retrieve a specific attribute from a fantasy league', async () => {
    const flAccessor = new FLAccessor(ownerID);
    const league = { id: 'league1', name: 'League One', OwnerID: ownerID, attribute: 'Value' };
  
    DataStore.query.mockResolvedValue([league]);
  
    const result = await flAccessor.getFantasyLeagueAttribute('league1', 'attribute');
  
    expect(result).toBe('Value');
  });


  it('should fail to update a non-existent fantasy league', async () => {
    const flAccessor = new FLAccessor('ownerID');
    const nonExistentLeagueID = 'nonExistentLeagueID';
    const updates = { name: 'Updated Name' };
    DataStore.query.mockResolvedValue([]); // Simulate no league found
  
    await expect(flAccessor.updateFantasyLeague(nonExistentLeagueID, updates))
      .rejects
      .toThrow('Fantasy league not found');
  });
  
  it('should fail to retrieve a non-existent fantasy league', async () => {
  const flAccessor = new FLAccessor('ownerID');
  const nonExistentLeagueID = 'nonExistentLeagueID';
  DataStore.query.mockResolvedValue([]); // Simulate no league found

  await expect(flAccessor.getFantasyLeague(nonExistentLeagueID))
    .rejects
    .toThrow('Fantasy league not found');
});

it('should fail to save a fantasy league with missing information', async () => {
  const flAccessor = new FLAccessor("ownerID");
  // Example setup with missing 'Name' and an invalid 'DraftDate'
  const leagueData = {
    // Name is missing
    Properties: {},
    DraftDate : '2023-03-02T00:00:00Z',
    TradeDeadline : '2023-05-07T00:00:00Z',
    PlayoffStartDate : '2023-09-01T00:00:00Z',
    PlayoffTeams: 8,
    PlayoffMatchupLength: 1,
    WeeklyPickups: null,
    VetoVoteEnabled: true,
    Schedule: {},
  };

  await expect(flAccessor.saveFantasyLeague(leagueData))
    .rejects
    .toThrow("Missing required information to save fantasy league.");
});


it('should fail to retrieve a fantasy league attribute with invalid ID or attribute', async () => {
  const flAccessor = new FLAccessor("validOwnerID");
  const invalidID = "invalidID";
  const invalidAttribute = "nonExistentAttribute";

  // Mock to simulate no matching fantasy league found
  DataStore.query.mockResolvedValue([]);

  await expect(flAccessor.getFantasyLeagueAttribute(invalidID, invalidAttribute))
    .rejects
    .toThrow("Fantasy league or attribute not found.");
});
