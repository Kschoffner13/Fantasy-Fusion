import FLAccessor from "../Accessors/FLAccessor";
import TeamAccessor from "../Accessors/TeamAccessor";

class AccessVerification {
    constructor(userId, leagueId) {
        this.userId = userId;
        this.leagueId = leagueId;
    }

    async verifyTeamAccess(teamId) {
        const teamAccessor = new TeamAccessor();
        const res = await teamAccessor.getTeamById(teamId);
        console.log("HERE", res);
        if (
            this.leagueId === res?.fantasyleagueID &&
            this.userId === res?.UserID
        ) {
            return true;
        }
        return false;
    }

    async verifyLeagueAccess() {
        const teamAccessor = new TeamAccessor();
        const teams = await teamAccessor.getLeaugesTeams(this.leagueId);
        for (let team of teams) {
            if (this.userId === team.UserID) {
                return true;
            }
        }
        return false;
    }
}

export default AccessVerification;
