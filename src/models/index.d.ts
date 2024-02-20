import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerDraft = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Draft, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly order?: string | null;
  readonly pickDeadline?: string | null;
  readonly curentPick?: number | null;
  readonly playersDrafted?: string | null;
  readonly fantasyleagueID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDraft = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Draft, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly order?: string | null;
  readonly pickDeadline?: string | null;
  readonly curentPick?: number | null;
  readonly playersDrafted?: string | null;
  readonly fantasyleagueID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Draft = LazyLoading extends LazyLoadingDisabled ? EagerDraft : LazyDraft

export declare const Draft: (new (init: ModelInit<Draft>) => Draft) & {
  copyOf(source: Draft, mutator: (draft: MutableModel<Draft>) => MutableModel<Draft> | void): Draft;
}

type EagerTeam = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Team, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Name?: string | null;
  readonly UserID?: string | null;
  readonly TotalPointsFor?: number | null;
  readonly TotalPointsAgainst?: number | null;
  readonly MatchUpPoints?: number | null;
  readonly Wins?: number | null;
  readonly Losses?: number | null;
  readonly Draws?: number | null;
  readonly Roster?: string | null;
  readonly fantasyleagueID: string;
  readonly PlayerList?: string | null;
  readonly Lineup?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTeam = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Team, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Name?: string | null;
  readonly UserID?: string | null;
  readonly TotalPointsFor?: number | null;
  readonly TotalPointsAgainst?: number | null;
  readonly MatchUpPoints?: number | null;
  readonly Wins?: number | null;
  readonly Losses?: number | null;
  readonly Draws?: number | null;
  readonly Roster?: string | null;
  readonly fantasyleagueID: string;
  readonly PlayerList?: string | null;
  readonly Lineup?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Team = LazyLoading extends LazyLoadingDisabled ? EagerTeam : LazyTeam

export declare const Team: (new (init: ModelInit<Team>) => Team) & {
  copyOf(source: Team, mutator: (draft: MutableModel<Team>) => MutableModel<Team> | void): Team;
}

type EagerFantasyLeague = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FantasyLeague, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Name?: string | null;
  readonly OwnerID?: string | null;
  readonly Properties?: string | null;
  readonly DraftDate?: string | null;
  readonly TradeDeadline?: string | null;
  readonly PlayoffStartDate?: string | null;
  readonly PlayoffTeams?: number | null;
  readonly PlayoffMatchupLength?: number | null;
  readonly WeeklyPickups?: number | null;
  readonly VetoVoteEnabled?: boolean | null;
  readonly Teams?: (Team | null)[] | null;
  readonly Schedule?: string | null;
  readonly Draft?: Draft | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly fantasyLeagueDraftId?: string | null;
}

type LazyFantasyLeague = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FantasyLeague, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Name?: string | null;
  readonly OwnerID?: string | null;
  readonly Properties?: string | null;
  readonly DraftDate?: string | null;
  readonly TradeDeadline?: string | null;
  readonly PlayoffStartDate?: string | null;
  readonly PlayoffTeams?: number | null;
  readonly PlayoffMatchupLength?: number | null;
  readonly WeeklyPickups?: number | null;
  readonly VetoVoteEnabled?: boolean | null;
  readonly Teams: AsyncCollection<Team>;
  readonly Schedule?: string | null;
  readonly Draft: AsyncItem<Draft | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly fantasyLeagueDraftId?: string | null;
}

export declare type FantasyLeague = LazyLoading extends LazyLoadingDisabled ? EagerFantasyLeague : LazyFantasyLeague

export declare const FantasyLeague: (new (init: ModelInit<FantasyLeague>) => FantasyLeague) & {
  copyOf(source: FantasyLeague, mutator: (draft: MutableModel<FantasyLeague>) => MutableModel<FantasyLeague> | void): FantasyLeague;
}