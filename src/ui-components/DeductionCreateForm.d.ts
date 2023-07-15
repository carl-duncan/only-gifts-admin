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
export declare type DeductionCreateFormInputValues = {
    reason?: string;
    percent?: number;
    flat_amount?: number;
};
export declare type DeductionCreateFormValidationValues = {
    reason?: ValidationFunction<string>;
    percent?: ValidationFunction<number>;
    flat_amount?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DeductionCreateFormOverridesProps = {
    DeductionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    reason?: PrimitiveOverrideProps<TextFieldProps>;
    percent?: PrimitiveOverrideProps<TextFieldProps>;
    flat_amount?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DeductionCreateFormProps = React.PropsWithChildren<{
    overrides?: DeductionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: DeductionCreateFormInputValues) => DeductionCreateFormInputValues;
    onSuccess?: (fields: DeductionCreateFormInputValues) => void;
    onError?: (fields: DeductionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DeductionCreateFormInputValues) => DeductionCreateFormInputValues;
    onValidate?: DeductionCreateFormValidationValues;
} & React.CSSProperties>;
export default function DeductionCreateForm(props: DeductionCreateFormProps): React.ReactElement;
