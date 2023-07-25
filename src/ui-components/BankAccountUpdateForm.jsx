/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { BankAccount } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function BankAccountUpdateForm(props) {
  const {
    id: idProp,
    bankAccount: bankAccountModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    bank_name: "",
    account_number: "",
    bank_branch: "",
    user_id: "",
    branch_code: "",
  };
  const [bank_name, setBank_name] = React.useState(initialValues.bank_name);
  const [account_number, setAccount_number] = React.useState(
    initialValues.account_number
  );
  const [bank_branch, setBank_branch] = React.useState(
    initialValues.bank_branch
  );
  const [user_id, setUser_id] = React.useState(initialValues.user_id);
  const [branch_code, setBranch_code] = React.useState(
    initialValues.branch_code
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = bankAccountRecord
      ? { ...initialValues, ...bankAccountRecord }
      : initialValues;
    setBank_name(cleanValues.bank_name);
    setAccount_number(cleanValues.account_number);
    setBank_branch(cleanValues.bank_branch);
    setUser_id(cleanValues.user_id);
    setBranch_code(cleanValues.branch_code);
    setErrors({});
  };
  const [bankAccountRecord, setBankAccountRecord] =
    React.useState(bankAccountModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(BankAccount, idProp)
        : bankAccountModelProp;
      setBankAccountRecord(record);
    };
    queryData();
  }, [idProp, bankAccountModelProp]);
  React.useEffect(resetStateValues, [bankAccountRecord]);
  const validations = {
    bank_name: [{ type: "Required" }],
    account_number: [{ type: "Required" }],
    bank_branch: [{ type: "Required" }],
    user_id: [{ type: "Required" }],
    branch_code: [{ type: "Required" }],
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
          bank_name,
          account_number,
          bank_branch,
          user_id,
          branch_code,
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
            BankAccount.copyOf(bankAccountRecord, (updated) => {
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
      {...getOverrideProps(overrides, "BankAccountUpdateForm")}
      {...rest}
    >
      <TextField
        label="Bank name"
        isRequired={true}
        isReadOnly={false}
        value={bank_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              bank_name: value,
              account_number,
              bank_branch,
              user_id,
              branch_code,
            };
            const result = onChange(modelFields);
            value = result?.bank_name ?? value;
          }
          if (errors.bank_name?.hasError) {
            runValidationTasks("bank_name", value);
          }
          setBank_name(value);
        }}
        onBlur={() => runValidationTasks("bank_name", bank_name)}
        errorMessage={errors.bank_name?.errorMessage}
        hasError={errors.bank_name?.hasError}
        {...getOverrideProps(overrides, "bank_name")}
      ></TextField>
      <TextField
        label="Account number"
        isRequired={true}
        isReadOnly={false}
        value={account_number}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              bank_name,
              account_number: value,
              bank_branch,
              user_id,
              branch_code,
            };
            const result = onChange(modelFields);
            value = result?.account_number ?? value;
          }
          if (errors.account_number?.hasError) {
            runValidationTasks("account_number", value);
          }
          setAccount_number(value);
        }}
        onBlur={() => runValidationTasks("account_number", account_number)}
        errorMessage={errors.account_number?.errorMessage}
        hasError={errors.account_number?.hasError}
        {...getOverrideProps(overrides, "account_number")}
      ></TextField>
      <TextField
        label="Bank branch"
        isRequired={true}
        isReadOnly={false}
        value={bank_branch}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              bank_name,
              account_number,
              bank_branch: value,
              user_id,
              branch_code,
            };
            const result = onChange(modelFields);
            value = result?.bank_branch ?? value;
          }
          if (errors.bank_branch?.hasError) {
            runValidationTasks("bank_branch", value);
          }
          setBank_branch(value);
        }}
        onBlur={() => runValidationTasks("bank_branch", bank_branch)}
        errorMessage={errors.bank_branch?.errorMessage}
        hasError={errors.bank_branch?.hasError}
        {...getOverrideProps(overrides, "bank_branch")}
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
              bank_name,
              account_number,
              bank_branch,
              user_id: value,
              branch_code,
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
        label="Branch code"
        isRequired={true}
        isReadOnly={false}
        value={branch_code}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              bank_name,
              account_number,
              bank_branch,
              user_id,
              branch_code: value,
            };
            const result = onChange(modelFields);
            value = result?.branch_code ?? value;
          }
          if (errors.branch_code?.hasError) {
            runValidationTasks("branch_code", value);
          }
          setBranch_code(value);
        }}
        onBlur={() => runValidationTasks("branch_code", branch_code)}
        errorMessage={errors.branch_code?.errorMessage}
        hasError={errors.branch_code?.hasError}
        {...getOverrideProps(overrides, "branch_code")}
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
          isDisabled={!(idProp || bankAccountModelProp)}
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
              !(idProp || bankAccountModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
