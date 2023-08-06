/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Disbursement } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function DisbursementCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    amount: "",
    user_id: "",
    currency: "",
    bank_account_id: "",
    status: "",
    withdrawal_date: "",
  };
  const [amount, setAmount] = React.useState(initialValues.amount);
  const [user_id, setUser_id] = React.useState(initialValues.user_id);
  const [currency, setCurrency] = React.useState(initialValues.currency);
  const [bank_account_id, setBank_account_id] = React.useState(
    initialValues.bank_account_id
  );
  const [status, setStatus] = React.useState(initialValues.status);
  const [withdrawal_date, setWithdrawal_date] = React.useState(
    initialValues.withdrawal_date
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setAmount(initialValues.amount);
    setUser_id(initialValues.user_id);
    setCurrency(initialValues.currency);
    setBank_account_id(initialValues.bank_account_id);
    setStatus(initialValues.status);
    setWithdrawal_date(initialValues.withdrawal_date);
    setErrors({});
  };
  const validations = {
    amount: [{ type: "Required" }],
    user_id: [{ type: "Required" }],
    currency: [{ type: "Required" }],
    bank_account_id: [{ type: "Required" }],
    status: [{ type: "Required" }],
    withdrawal_date: [],
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
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
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
          amount,
          user_id,
          currency,
          bank_account_id,
          status,
          withdrawal_date,
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
          await DataStore.save(new Disbursement(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "DisbursementCreateForm")}
      {...rest}
    >
      <TextField
        label="Amount"
        isRequired={true}
        isReadOnly={false}
        value={amount}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              amount: value,
              user_id,
              currency,
              bank_account_id,
              status,
              withdrawal_date,
            };
            const result = onChange(modelFields);
            value = result?.amount ?? value;
          }
          if (errors.amount?.hasError) {
            runValidationTasks("amount", value);
          }
          setAmount(value);
        }}
        onBlur={() => runValidationTasks("amount", amount)}
        errorMessage={errors.amount?.errorMessage}
        hasError={errors.amount?.hasError}
        {...getOverrideProps(overrides, "amount")}
      ></TextField>
      <TextField
        label="User id"
        isRequired={true}
        isReadOnly={false}
        value={user_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              amount,
              user_id: value,
              currency,
              bank_account_id,
              status,
              withdrawal_date,
            };
            const result = onChange(modelFields);
            value = result?.user_id ?? value;
          }
          if (errors.user_id?.hasError) {
            runValidationTasks("user_id", value);
          }
          setUser_id(value);
        }}
        onBlur={() => runValidationTasks("user_id", user_id)}
        errorMessage={errors.user_id?.errorMessage}
        hasError={errors.user_id?.hasError}
        {...getOverrideProps(overrides, "user_id")}
      ></TextField>
      <TextField
        label="Currency"
        isRequired={true}
        isReadOnly={false}
        value={currency}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              amount,
              user_id,
              currency: value,
              bank_account_id,
              status,
              withdrawal_date,
            };
            const result = onChange(modelFields);
            value = result?.currency ?? value;
          }
          if (errors.currency?.hasError) {
            runValidationTasks("currency", value);
          }
          setCurrency(value);
        }}
        onBlur={() => runValidationTasks("currency", currency)}
        errorMessage={errors.currency?.errorMessage}
        hasError={errors.currency?.hasError}
        {...getOverrideProps(overrides, "currency")}
      ></TextField>
      <TextField
        label="Bank account id"
        isRequired={true}
        isReadOnly={false}
        value={bank_account_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              amount,
              user_id,
              currency,
              bank_account_id: value,
              status,
              withdrawal_date,
            };
            const result = onChange(modelFields);
            value = result?.bank_account_id ?? value;
          }
          if (errors.bank_account_id?.hasError) {
            runValidationTasks("bank_account_id", value);
          }
          setBank_account_id(value);
        }}
        onBlur={() => runValidationTasks("bank_account_id", bank_account_id)}
        errorMessage={errors.bank_account_id?.errorMessage}
        hasError={errors.bank_account_id?.hasError}
        {...getOverrideProps(overrides, "bank_account_id")}
      ></TextField>
      <SelectField
        label="Status"
        placeholder="Please select an option"
        isDisabled={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              amount,
              user_id,
              currency,
              bank_account_id,
              status: value,
              withdrawal_date,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      >
        <option
          children="Pending"
          value="PENDING"
          {...getOverrideProps(overrides, "statusoption0")}
        ></option>
        <option
          children="Completed"
          value="COMPLETED"
          {...getOverrideProps(overrides, "statusoption1")}
        ></option>
        <option
          children="Rejected"
          value="REJECTED"
          {...getOverrideProps(overrides, "statusoption2")}
        ></option>
      </SelectField>
      <TextField
        label="Withdrawal date"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={withdrawal_date && convertToLocal(new Date(withdrawal_date))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              amount,
              user_id,
              currency,
              bank_account_id,
              status,
              withdrawal_date: value,
            };
            const result = onChange(modelFields);
            value = result?.withdrawal_date ?? value;
          }
          if (errors.withdrawal_date?.hasError) {
            runValidationTasks("withdrawal_date", value);
          }
          setWithdrawal_date(value);
        }}
        onBlur={() => runValidationTasks("withdrawal_date", withdrawal_date)}
        errorMessage={errors.withdrawal_date?.errorMessage}
        hasError={errors.withdrawal_date?.hasError}
        {...getOverrideProps(overrides, "withdrawal_date")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
