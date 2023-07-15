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
export declare type ProfileCreateFormInputValues = {
    display_name?: string;
    user_name?: string;
    balance?: number;
    currency?: string;
    url?: string;
    bio?: string;
    user_id?: string;
    token?: string;
};
export declare type ProfileCreateFormValidationValues = {
    display_name?: ValidationFunction<string>;
    user_name?: ValidationFunction<string>;
    balance?: ValidationFunction<number>;
    currency?: ValidationFunction<string>;
    url?: ValidationFunction<string>;
    bio?: ValidationFunction<string>;
    user_id?: ValidationFunction<string>;
    token?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProfileCreateFormOverridesProps = {
    ProfileCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    display_name?: PrimitiveOverrideProps<TextFieldProps>;
    user_name?: PrimitiveOverrideProps<TextFieldProps>;
    balance?: PrimitiveOverrideProps<TextFieldProps>;
    currency?: PrimitiveOverrideProps<TextFieldProps>;
    url?: PrimitiveOverrideProps<TextFieldProps>;
    bio?: PrimitiveOverrideProps<TextFieldProps>;
    user_id?: PrimitiveOverrideProps<TextFieldProps>;
    token?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProfileCreateFormProps = React.PropsWithChildren<{
    overrides?: ProfileCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ProfileCreateFormInputValues) => ProfileCreateFormInputValues;
    onSuccess?: (fields: ProfileCreateFormInputValues) => void;
    onError?: (fields: ProfileCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProfileCreateFormInputValues) => ProfileCreateFormInputValues;
    onValidate?: ProfileCreateFormValidationValues;
} & React.CSSProperties>;
export default function ProfileCreateForm(props: ProfileCreateFormProps): React.ReactElement;
