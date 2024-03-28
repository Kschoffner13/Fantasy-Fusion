const DraftAccessor  = require ('../src/Accessors/DraftAccessor').default;
const { DataStore } = require('@aws-amplify/datastore');


jest.mock('@aws-amplify/datastore', () => {
    // Mock implementation of copyOf to simulate Amplify's behavior
    const mockCopyOf = (original, updater) => {
      const updated = { ...original };
      updater(updated);
      return updated;
    };
  
    return {
      DataStore: {
        query: jest.fn(),
        save: jest.fn((model) => {
          // Simulate the behavior of copyOf within the mocked save method
          if (typeof model.copyOf === 'function') {
            return model.copyOf(mockCopyOf);
          }
          return Promise.resolve(model); // Assume save operation successful
        }),
        delete: jest.fn(),
      },
      // Assuming Draft and other models are initialized here
      initSchema: jest.fn().mockImplementation(() => ({
        Draft: class MockDraft {
          // Provide a static copyOf method that matches the expected behavior
          static copyOf = mockCopyOf;
        },
        FantasyLeague: class MockFantasyLeague {},
      })),
    };
  });
  

// Example FLID and mock draft data for use in tests
const FLID = 'fantasyLeague1';
const mockDraftData = { fantasyleagueID: FLID, curentPick: 1, playersDrafted: { picks: [] } };

it('should save a new draft', async () => {
    const draftAccessor = new DraftAccessor(FLID);
    const draftDetails = { name: 'Draft Test', fantasyleagueID: FLID };
    DataStore.save.mockResolvedValue(draftDetails);
  
    const result = await draftAccessor.saveDraft({ name: 'Draft Test' });
  
    expect(DataStore.save).toHaveBeenCalledWith(expect.anything());
    expect(result).toEqual(draftDetails);
  });
  
  it('should retrieve drafts for the given fantasy league ID', async () => {
    const draftAccessor = new DraftAccessor(FLID);
    DataStore.query.mockResolvedValue([mockDraftData]);
  
    const result = await draftAccessor.getDraft();
  
    expect(DataStore.query).toHaveBeenCalledWith(expect.anything(), expect.anything());
    expect(result).toEqual([mockDraftData]);
  });

  it('should make a pick and update the draft', async () => {
    const draftAccessor = new DraftAccessor('some-fl-id');
    const playerID = 'player1';
    const irlLeague = 'some-league';
  
    DataStore.query.mockResolvedValue([{ 
      fantasyleagueID: 'some-fl-id', 
      playersDrafted: JSON.stringify({ picks: [] }) // Ensure this matches the expected format
    }]);
  
    await draftAccessor.makePick(playerID, irlLeague);
  
    expect(DataStore.save).toHaveBeenCalled();
    // Additional assertions as needed
  });
  
  it('should fail to save a draft if one already exists for the fantasy league', async () => {
    const draftAccessor = new DraftAccessor('existingFLID');
    const draftDic = { name: 'New Draft' };
    
    // Mock existing draft for the fantasy league
    DataStore.query.mockResolvedValue([{ name: 'Existing Draft' }]);
    
    // Attempt to save a new draft for the same fantasy league
    await expect(draftAccessor.saveDraft(draftDic))
      .rejects
      .toThrow('A draft for this fantasy league already exists');
  });
  
  it('should fail when attempting to get drafts for a fantasy league with no drafts', async () => {
    const draftAccessor = new DraftAccessor('nonexistentFLID');
    
    // Simulate no drafts found
    DataStore.query.mockResolvedValue([]);
    
    await expect(draftAccessor.getDraft())
      .rejects
      .toThrow('No drafts found for this fantasy league');
  });

  it('should fail to update a non-existent draft', async () => {
    const draftAccessor = new DraftAccessor('FLIDWithNoDrafts');
    const updates = {
      order: 'newOrder', // Example value
      pickDeadline: '2023-10-10', // Example value
      currentPick: 2, // Example value
      playersDrafted: '[]', // Assuming this needs to be a JSON string
    };
    
    // Simulate no draft found for update
    DataStore.query.mockResolvedValue([]);
    
    await expect(draftAccessor.updateDraft(updates))
      .rejects
      .toThrow('No drafts found for this fantasy league.');
  });
  
  it('should fail to make a pick when the roster size of 23 is full', async () => {
    const draftAccessor = new DraftAccessor('fullRosterFLID');
    const playerID = 'player24';
    const irlLeague = 'some-league';

    // Simulate a draft state where 23 picks have already been made
    const fullDraftData = {
        fantasyleagueID: 'fullRosterFLID',
        currentPick: 23,
        playersDrafted: JSON.stringify({ picks: new Array(23).fill(null).map((_, index) => ({ pick: index + 1, playerID: `player${index + 1}`, league: irlLeague })) }),
    };

    // Mock DataStore.query to return the full draft state
    DataStore.query.mockResolvedValue([fullDraftData]);

    // Execute `makePick` and expect it to fail due to the roster being full
    await expect(draftAccessor.makePick(playerID, irlLeague))
        .rejects
        .toThrow('The draft is already full');
});
  
  