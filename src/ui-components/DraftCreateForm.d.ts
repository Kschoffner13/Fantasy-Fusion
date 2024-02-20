/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type DraftCreateFormInputValues = {
    order?: string;
    pickDeadline?: string;
    curentPick?: number;
    playersDrafted?: string;
};
export declare type DraftCreateFormValidationValues = {
    order?: ValidationFunction<string>;
    pickDeadline?: ValidationFunction<string>;
    curentPick?: ValidationFunction<number>;
    playersDrafted?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DraftCreateFormOverridesProps = {
    DraftCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    order?: PrimitiveOverrideProps<TextAreaFieldProps>;
    pickDeadline?: PrimitiveOverrideProps<TextFieldProps>;
    curentPick?: PrimitiveOverrideProps<TextFieldProps>;
    playersDrafted?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type DraftCreateFormProps = React.PropsWithChildren<{
    overrides?: DraftCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: DraftCreateFormInputValues) => DraftCreateFormInputValues;
    onSuccess?: (fields: DraftCreateFormInputValues) => void;
    onError?: (fields: DraftCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DraftCreateFormInputValues) => DraftCreateFormInputValues;
    onValidate?: DraftCreateFormValidationValues;
} & React.CSSProperties>;
export default function DraftCreateForm(props: DraftCreateFormProps): React.ReactElement;
