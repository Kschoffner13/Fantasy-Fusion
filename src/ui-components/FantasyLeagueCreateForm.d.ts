/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type FantasyLeagueCreateFormInputValues = {
    Name?: string;
    OwnerID?: string;
    Properties?: string;
    DraftDate?: string;
    TradeDeadline?: string;
    PlayoffStartDate?: string;
    PlayoffTeams?: number;
    PlayoffMatchupLength?: number;
    WeeklyPickups?: number;
    VetoVoteEnabled?: boolean;
    Schedule?: string;
};
export declare type FantasyLeagueCreateFormValidationValues = {
    Name?: ValidationFunction<string>;
    OwnerID?: ValidationFunction<string>;
    Properties?: ValidationFunction<string>;
    DraftDate?: ValidationFunction<string>;
    TradeDeadline?: ValidationFunction<string>;
    PlayoffStartDate?: ValidationFunction<string>;
    PlayoffTeams?: ValidationFunction<number>;
    PlayoffMatchupLength?: ValidationFunction<number>;
    WeeklyPickups?: ValidationFunction<number>;
    VetoVoteEnabled?: ValidationFunction<boolean>;
    Schedule?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FantasyLeagueCreateFormOverridesProps = {
    FantasyLeagueCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Name?: PrimitiveOverrideProps<TextFieldProps>;
    OwnerID?: PrimitiveOverrideProps<TextFieldProps>;
    Properties?: PrimitiveOverrideProps<TextAreaFieldProps>;
    DraftDate?: PrimitiveOverrideProps<TextFieldProps>;
    TradeDeadline?: PrimitiveOverrideProps<TextFieldProps>;
    PlayoffStartDate?: PrimitiveOverrideProps<TextFieldProps>;
    PlayoffTeams?: PrimitiveOverrideProps<TextFieldProps>;
    PlayoffMatchupLength?: PrimitiveOverrideProps<TextFieldProps>;
    WeeklyPickups?: PrimitiveOverrideProps<TextFieldProps>;
    VetoVoteEnabled?: PrimitiveOverrideProps<SwitchFieldProps>;
    Schedule?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type FantasyLeagueCreateFormProps = React.PropsWithChildren<{
    overrides?: FantasyLeagueCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: FantasyLeagueCreateFormInputValues) => FantasyLeagueCreateFormInputValues;
    onSuccess?: (fields: FantasyLeagueCreateFormInputValues) => void;
    onError?: (fields: FantasyLeagueCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FantasyLeagueCreateFormInputValues) => FantasyLeagueCreateFormInputValues;
    onValidate?: FantasyLeagueCreateFormValidationValues;
} & React.CSSProperties>;
export default function FantasyLeagueCreateForm(props: FantasyLeagueCreateFormProps): React.ReactElement;
