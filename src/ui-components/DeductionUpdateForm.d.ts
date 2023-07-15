/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Deduction } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type DeductionUpdateFormInputValues = {
    reason?: string;
    percent?: number;
    flat_amount?: number;
};
export declare type DeductionUpdateFormValidationValues = {
    reason?: ValidationFunction<string>;
    percent?: ValidationFunction<number>;
    flat_amount?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DeductionUpdateFormOverridesProps = {
    DeductionUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    reason?: PrimitiveOverrideProps<TextFieldProps>;
    percent?: PrimitiveOverrideProps<TextFieldProps>;
    flat_amount?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DeductionUpdateFormProps = React.PropsWithChildren<{
    overrides?: DeductionUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    deduction?: Deduction;
    onSubmit?: (fields: DeductionUpdateFormInputValues) => DeductionUpdateFormInputValues;
    onSuccess?: (fields: DeductionUpdateFormInputValues) => void;
    onError?: (fields: DeductionUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DeductionUpdateFormInputValues) => DeductionUpdateFormInputValues;
    onValidate?: DeductionUpdateFormValidationValues;
} & React.CSSProperties>;
export default function DeductionUpdateForm(props: DeductionUpdateFormProps): React.ReactElement;
