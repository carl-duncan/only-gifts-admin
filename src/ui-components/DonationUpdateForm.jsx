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
import { Donation } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function DonationUpdateForm(props) {
  const {
    id: idProp,
    donation: donationModelProp,
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
    message: "",
    name: "",
    payment_intent_id: "",
    seon_score: "",
    status: "",
    payment_method_id: "",
  };
  const [amount, setAmount] = React.useState(initialValues.amount);
  const [user_id, setUser_id] = React.useState(initialValues.user_id);
  const [currency, setCurrency] = React.useState(initialValues.currency);
  const [message, setMessage] = React.useState(initialValues.message);
  const [name, setName] = React.useState(initialValues.name);
  const [payment_intent_id, setPayment_intent_id] = React.useState(
    initialValues.payment_intent_id
  );
  const [seon_score, setSeon_score] = React.useState(initialValues.seon_score);
  const [status, setStatus] = React.useState(initialValues.status);
  const [payment_method_id, setPayment_method_id] = React.useState(
    initialValues.payment_method_id
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = donationRecord
      ? { ...initialValues, ...donationRecord }
      : initialValues;
    setAmount(cleanValues.amount);
    setUser_id(cleanValues.user_id);
    setCurrency(cleanValues.currency);
    setMessage(cleanValues.message);
    setName(cleanValues.name);
    setPayment_intent_id(cleanValues.payment_intent_id);
    setSeon_score(cleanValues.seon_score);
    setStatus(cleanValues.status);
    setPayment_method_id(cleanValues.payment_method_id);
    setErrors({});
  };
  const [donationRecord, setDonationRecord] = React.useState(donationModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Donation, idProp)
        : donationModelProp;
      setDonationRecord(record);
    };
    queryData();
  }, [idProp, donationModelProp]);
  React.useEffect(resetStateValues, [donationRecord]);
  const validations = {
    amount: [{ type: "Required" }],
    user_id: [{ type: "Required" }],
    currency: [{ type: "Required" }],
    message: [],
    name: [],
    payment_intent_id: [],
    seon_score: [],
    status: [],
    payment_method_id: [],
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
          amount,
          user_id,
          currency,
          message,
          name,
          payment_intent_id,
          seon_score,
          status,
          payment_method_id,
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
            Donation.copyOf(donationRecord, (updated) => {
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
      {...getOverrideProps(overrides, "DonationUpdateForm")}
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
              message,
              name,
              payment_intent_id,
              seon_score,
              status,
              payment_method_id,
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
              message,
              name,
              payment_intent_id,
              seon_score,
              status,
              payment_method_id,
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
              message,
              name,
              payment_intent_id,
              seon_score,
              status,
              payment_method_id,
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
        label="Message"
        isRequired={false}
        isReadOnly={false}
        value={message}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              amount,
              user_id,
              currency,
              message: value,
              name,
              payment_intent_id,
              seon_score,
              status,
              payment_method_id,
            };
            const result = onChange(modelFields);
            value = result?.message ?? value;
          }
          if (errors.message?.hasError) {
            runValidationTasks("message", value);
          }
          setMessage(value);
        }}
        onBlur={() => runValidationTasks("message", message)}
        errorMessage={errors.message?.errorMessage}
        hasError={errors.message?.hasError}
        {...getOverrideProps(overrides, "message")}
      ></TextField>
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              amount,
              user_id,
              currency,
              message,
              name: value,
              payment_intent_id,
              seon_score,
              status,
              payment_method_id,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Payment intent id"
        isRequired={false}
        isReadOnly={false}
        value={payment_intent_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              amount,
              user_id,
              currency,
              message,
              name,
              payment_intent_id: value,
              seon_score,
              status,
              payment_method_id,
            };
            const result = onChange(modelFields);
            value = result?.payment_intent_id ?? value;
          }
          if (errors.payment_intent_id?.hasError) {
            runValidationTasks("payment_intent_id", value);
          }
          setPayment_intent_id(value);
        }}
        onBlur={() =>
          runValidationTasks("payment_intent_id", payment_intent_id)
        }
        errorMessage={errors.payment_intent_id?.errorMessage}
        hasError={errors.payment_intent_id?.hasError}
        {...getOverrideProps(overrides, "payment_intent_id")}
      ></TextField>
      <TextField
        label="Seon score"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={seon_score}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              amount,
              user_id,
              currency,
              message,
              name,
              payment_intent_id,
              seon_score: value,
              status,
              payment_method_id,
            };
            const result = onChange(modelFields);
            value = result?.seon_score ?? value;
          }
          if (errors.seon_score?.hasError) {
            runValidationTasks("seon_score", value);
          }
          setSeon_score(value);
        }}
        onBlur={() => runValidationTasks("seon_score", seon_score)}
        errorMessage={errors.seon_score?.errorMessage}
        hasError={errors.seon_score?.hasError}
        {...getOverrideProps(overrides, "seon_score")}
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
              message,
              name,
              payment_intent_id,
              seon_score,
              status: value,
              payment_method_id,
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
        label="Payment method id"
        isRequired={false}
        isReadOnly={false}
        value={payment_method_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              amount,
              user_id,
              currency,
              message,
              name,
              payment_intent_id,
              seon_score,
              status,
              payment_method_id: value,
            };
            const result = onChange(modelFields);
            value = result?.payment_method_id ?? value;
          }
          if (errors.payment_method_id?.hasError) {
            runValidationTasks("payment_method_id", value);
          }
          setPayment_method_id(value);
        }}
        onBlur={() =>
          runValidationTasks("payment_method_id", payment_method_id)
        }
        errorMessage={errors.payment_method_id?.errorMessage}
        hasError={errors.payment_method_id?.hasError}
        {...getOverrideProps(overrides, "payment_method_id")}
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
          isDisabled={!(idProp || donationModelProp)}
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
              !(idProp || donationModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
