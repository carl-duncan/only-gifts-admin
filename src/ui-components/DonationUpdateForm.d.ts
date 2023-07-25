/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Donation } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type DonationUpdateFormInputValues = {
    amount?: string;
    user_id?: string;
    currency?: string;
    message?: string;
    name?: string;
    payment_intent_id?: string;
    seon_score?: number;
    status?: string;
};
export declare type DonationUpdateFormValidationValues = {
    amount?: ValidationFunction<string>;
    user_id?: ValidationFunction<string>;
    currency?: ValidationFunction<string>;
    message?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    payment_intent_id?: ValidationFunction<string>;
    seon_score?: ValidationFunction<number>;
    status?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DonationUpdateFormOverridesProps = {
    DonationUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    amount?: PrimitiveOverrideProps<TextFieldProps>;
    user_id?: PrimitiveOverrideProps<TextFieldProps>;
    currency?: PrimitiveOverrideProps<TextFieldProps>;
    message?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    payment_intent_id?: PrimitiveOverrideProps<TextFieldProps>;
    seon_score?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type DonationUpdateFormProps = React.PropsWithChildren<{
    overrides?: DonationUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    donation?: Donation;
    onSubmit?: (fields: DonationUpdateFormInputValues) => DonationUpdateFormInputValues;
    onSuccess?: (fields: DonationUpdateFormInputValues) => void;
    onError?: (fields: DonationUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DonationUpdateFormInputValues) => DonationUpdateFormInputValues;
    onValidate?: DonationUpdateFormValidationValues;
} & React.CSSProperties>;
export default function DonationUpdateForm(props: DonationUpdateFormProps): React.ReactElement;
