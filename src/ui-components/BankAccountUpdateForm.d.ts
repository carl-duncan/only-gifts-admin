/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { BankAccount } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type BankAccountUpdateFormInputValues = {
    bank_name?: string;
    account_number?: string;
    bank_branch?: string;
    user_id?: string;
    branch_code?: string;
};
export declare type BankAccountUpdateFormValidationValues = {
    bank_name?: ValidationFunction<string>;
    account_number?: ValidationFunction<string>;
    bank_branch?: ValidationFunction<string>;
    user_id?: ValidationFunction<string>;
    branch_code?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BankAccountUpdateFormOverridesProps = {
    BankAccountUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    bank_name?: PrimitiveOverrideProps<TextFieldProps>;
    account_number?: PrimitiveOverrideProps<TextFieldProps>;
    bank_branch?: PrimitiveOverrideProps<TextFieldProps>;
    user_id?: PrimitiveOverrideProps<TextFieldProps>;
    branch_code?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BankAccountUpdateFormProps = React.PropsWithChildren<{
    overrides?: BankAccountUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    bankAccount?: BankAccount;
    onSubmit?: (fields: BankAccountUpdateFormInputValues) => BankAccountUpdateFormInputValues;
    onSuccess?: (fields: BankAccountUpdateFormInputValues) => void;
    onError?: (fields: BankAccountUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BankAccountUpdateFormInputValues) => BankAccountUpdateFormInputValues;
    onValidate?: BankAccountUpdateFormValidationValues;
} & React.CSSProperties>;
export default function BankAccountUpdateForm(props: BankAccountUpdateFormProps): React.ReactElement;
