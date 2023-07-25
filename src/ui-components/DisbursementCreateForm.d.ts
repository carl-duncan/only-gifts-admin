/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type DisbursementCreateFormInputValues = {
    amount?: string;
    user_id?: string;
    currency?: string;
    bank_account_id?: string;
    status?: string;
};
export declare type DisbursementCreateFormValidationValues = {
    amount?: ValidationFunction<string>;
    user_id?: ValidationFunction<string>;
    currency?: ValidationFunction<string>;
    bank_account_id?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DisbursementCreateFormOverridesProps = {
    DisbursementCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    amount?: PrimitiveOverrideProps<TextFieldProps>;
    user_id?: PrimitiveOverrideProps<TextFieldProps>;
    currency?: PrimitiveOverrideProps<TextFieldProps>;
    bank_account_id?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type DisbursementCreateFormProps = React.PropsWithChildren<{
    overrides?: DisbursementCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: DisbursementCreateFormInputValues) => DisbursementCreateFormInputValues;
    onSuccess?: (fields: DisbursementCreateFormInputValues) => void;
    onError?: (fields: DisbursementCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DisbursementCreateFormInputValues) => DisbursementCreateFormInputValues;
    onValidate?: DisbursementCreateFormValidationValues;
} & React.CSSProperties>;
export default function DisbursementCreateForm(props: DisbursementCreateFormProps): React.ReactElement;
