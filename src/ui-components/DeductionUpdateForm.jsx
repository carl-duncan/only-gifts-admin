/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Deduction } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function DeductionUpdateForm(props) {
  const {
    id: idProp,
    deduction: deductionModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    reason: "",
    percent: "",
    flat_amount: "",
  };
  const [reason, setReason] = React.useState(initialValues.reason);
  const [percent, setPercent] = React.useState(initialValues.percent);
  const [flat_amount, setFlat_amount] = React.useState(
    initialValues.flat_amount
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = deductionRecord
      ? { ...initialValues, ...deductionRecord }
      : initialValues;
    setReason(cleanValues.reason);
    setPercent(cleanValues.percent);
    setFlat_amount(cleanValues.flat_amount);
    setErrors({});
  };
  const [deductionRecord, setDeductionRecord] =
    React.useState(deductionModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Deduction, idProp)
        : deductionModelProp;
      setDeductionRecord(record);
    };
    queryData();
  }, [idProp, deductionModelProp]);
  React.useEffect(resetStateValues, [deductionRecord]);
  const validations = {
    reason: [{ type: "Required" }],
    percent: [],
    flat_amount: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          reason,
          percent,
          flat_amount,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Deduction.copyOf(deductionRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "DeductionUpdateForm")}
      {...rest}
    >
      <TextField
        label="Reason"
        isRequired={true}
        isReadOnly={false}
        value={reason}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reason: value,
              percent,
              flat_amount,
            };
            const result = onChange(modelFields);
            value = result?.reason ?? value;
          }
          if (errors.reason?.hasError) {
            runValidationTasks("reason", value);
          }
          setReason(value);
        }}
        onBlur={() => runValidationTasks("reason", reason)}
        errorMessage={errors.reason?.errorMessage}
        hasError={errors.reason?.hasError}
        {...getOverrideProps(overrides, "reason")}
      ></TextField>
      <TextField
        label="Percent"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={percent}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              reason,
              percent: value,
              flat_amount,
            };
            const result = onChange(modelFields);
            value = result?.percent ?? value;
          }
          if (errors.percent?.hasError) {
            runValidationTasks("percent", value);
          }
          setPercent(value);
        }}
        onBlur={() => runValidationTasks("percent", percent)}
        errorMessage={errors.percent?.errorMessage}
        hasError={errors.percent?.hasError}
        {...getOverrideProps(overrides, "percent")}
      ></TextField>
      <TextField
        label="Flat amount"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={flat_amount}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              reason,
              percent,
              flat_amount: value,
            };
            const result = onChange(modelFields);
            value = result?.flat_amount ?? value;
          }
          if (errors.flat_amount?.hasError) {
            runValidationTasks("flat_amount", value);
          }
          setFlat_amount(value);
        }}
        onBlur={() => runValidationTasks("flat_amount", flat_amount)}
        errorMessage={errors.flat_amount?.errorMessage}
        hasError={errors.flat_amount?.hasError}
        {...getOverrideProps(overrides, "flat_amount")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || deductionModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || deductionModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
