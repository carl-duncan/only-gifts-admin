/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Statistic } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type StatisticUpdateFormInputValues = {
    name?: string;
    value?: number;
    code?: string;
};
export declare type StatisticUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    value?: ValidationFunction<number>;
    code?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type StatisticUpdateFormOverridesProps = {
    StatisticUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    value?: PrimitiveOverrideProps<TextFieldProps>;
    code?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type StatisticUpdateFormProps = React.PropsWithChildren<{
    overrides?: StatisticUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    statistic?: Statistic;
    onSubmit?: (fields: StatisticUpdateFormInputValues) => StatisticUpdateFormInputValues;
    onSuccess?: (fields: StatisticUpdateFormInputValues) => void;
    onError?: (fields: StatisticUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: StatisticUpdateFormInputValues) => StatisticUpdateFormInputValues;
    onValidate?: StatisticUpdateFormValidationValues;
} & React.CSSProperties>;
export default function StatisticUpdateForm(props: StatisticUpdateFormProps): React.ReactElement;
