/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Disbursement } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type DisbursementUpdateFormInputValues = {
    amount?: string;
    user_id?: string;
    currency?: string;
};
export declare type DisbursementUpdateFormValidationValues = {
    amount?: ValidationFunction<string>;
    user_id?: ValidationFunction<string>;
    currency?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DisbursementUpdateFormOverridesProps = {
    DisbursementUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    amount?: PrimitiveOverrideProps<TextFieldProps>;
    user_id?: PrimitiveOverrideProps<TextFieldProps>;
    currency?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DisbursementUpdateFormProps = React.PropsWithChildren<{
    overrides?: DisbursementUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    disbursement?: Disbursement;
    onSubmit?: (fields: DisbursementUpdateFormInputValues) => DisbursementUpdateFormInputValues;
    onSuccess?: (fields: DisbursementUpdateFormInputValues) => void;
    onError?: (fields: DisbursementUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DisbursementUpdateFormInputValues) => DisbursementUpdateFormInputValues;
    onValidate?: DisbursementUpdateFormValidationValues;
} & React.CSSProperties>;
export default function DisbursementUpdateForm(props: DisbursementUpdateFormProps): React.ReactElement;
