/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { FantasyLeague } from "../models";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type FantasyLeagueUpdateFormInputValues = {
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
export declare type FantasyLeagueUpdateFormValidationValues = {
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
export declare type FantasyLeagueUpdateFormOverridesProps = {
    FantasyLeagueUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type FantasyLeagueUpdateFormProps = React.PropsWithChildren<{
    overrides?: FantasyLeagueUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    fantasyLeague?: FantasyLeague;
    onSubmit?: (fields: FantasyLeagueUpdateFormInputValues) => FantasyLeagueUpdateFormInputValues;
    onSuccess?: (fields: FantasyLeagueUpdateFormInputValues) => void;
    onError?: (fields: FantasyLeagueUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FantasyLeagueUpdateFormInputValues) => FantasyLeagueUpdateFormInputValues;
    onValidate?: FantasyLeagueUpdateFormValidationValues;
} & React.CSSProperties>;
export default function FantasyLeagueUpdateForm(props: FantasyLeagueUpdateFormProps): React.ReactElement;
