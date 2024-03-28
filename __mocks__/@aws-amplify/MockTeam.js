class MockTeam {
    constructor(data) {
      // Simulate the properties of the Team model
      this.id = data.id || 'mock-team-id';
      this.name = data.name || 'Mock Team';
      this.fantasyleagueID = data.fantasyleagueID || 'mock-fantasyleague-id';
      this.UserID = data.UserID || 'mock-user-id';
      // Add other properties as needed
    }
  
    // Mock any methods the Team model has that you use
  }
  
  module.exports = MockTeam;
  