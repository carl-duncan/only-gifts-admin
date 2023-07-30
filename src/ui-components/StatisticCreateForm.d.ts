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
export declare type StatisticCreateFormInputValues = {
    name?: string;
    value?: number;
    code?: string;
};
export declare type StatisticCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    value?: ValidationFunction<number>;
    code?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type StatisticCreateFormOverridesProps = {
    StatisticCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    value?: PrimitiveOverrideProps<TextFieldProps>;
    code?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type StatisticCreateFormProps = React.PropsWithChildren<{
    overrides?: StatisticCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: StatisticCreateFormInputValues) => StatisticCreateFormInputValues;
    onSuccess?: (fields: StatisticCreateFormInputValues) => void;
    onError?: (fields: StatisticCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: StatisticCreateFormInputValues) => StatisticCreateFormInputValues;
    onValidate?: StatisticCreateFormValidationValues;
} & React.CSSProperties>;
export default function StatisticCreateForm(props: StatisticCreateFormProps): React.ReactElement;
