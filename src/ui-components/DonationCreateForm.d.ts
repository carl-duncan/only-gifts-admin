/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type DonationCreateFormInputValues = {
    amount?: string;
    user_id?: string;
    currency?: string;
    message?: string;
    name?: string;
    payment_intent_id?: string;
};
export declare type DonationCreateFormValidationValues = {
    amount?: ValidationFunction<string>;
    user_id?: ValidationFunction<string>;
    currency?: ValidationFunction<string>;
    message?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    payment_intent_id?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DonationCreateFormOverridesProps = {
    DonationCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    amount?: PrimitiveOverrideProps<TextFieldProps>;
    user_id?: PrimitiveOverrideProps<TextFieldProps>;
    currency?: PrimitiveOverrideProps<TextFieldProps>;
    message?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    payment_intent_id?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DonationCreateFormProps = React.PropsWithChildren<{
    overrides?: DonationCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: DonationCreateFormInputValues) => DonationCreateFormInputValues;
    onSuccess?: (fields: DonationCreateFormInputValues) => void;
    onError?: (fields: DonationCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DonationCreateFormInputValues) => DonationCreateFormInputValues;
    onValidate?: DonationCreateFormValidationValues;
} & React.CSSProperties>;
export default function DonationCreateForm(props: DonationCreateFormProps): React.ReactElement;
