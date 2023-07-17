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
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Profile } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ProfileUpdateForm(props) {
  const {
    id: idProp,
    profile: profileModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    display_name: "",
    user_name: "",
    balance: "",
    currency: "",
    url: "",
    bio: "",
    user_id: "",
    token: "",
    banned: false,
  };
  const [display_name, setDisplay_name] = React.useState(
    initialValues.display_name
  );
  const [user_name, setUser_name] = React.useState(initialValues.user_name);
  const [balance, setBalance] = React.useState(initialValues.balance);
  const [currency, setCurrency] = React.useState(initialValues.currency);
  const [url, setUrl] = React.useState(initialValues.url);
  const [bio, setBio] = React.useState(initialValues.bio);
  const [user_id, setUser_id] = React.useState(initialValues.user_id);
  const [token, setToken] = React.useState(initialValues.token);
  const [banned, setBanned] = React.useState(initialValues.banned);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = profileRecord
      ? { ...initialValues, ...profileRecord }
      : initialValues;
    setDisplay_name(cleanValues.display_name);
    setUser_name(cleanValues.user_name);
    setBalance(cleanValues.balance);
    setCurrency(cleanValues.currency);
    setUrl(cleanValues.url);
    setBio(cleanValues.bio);
    setUser_id(cleanValues.user_id);
    setToken(cleanValues.token);
    setBanned(cleanValues.banned);
    setErrors({});
  };
  const [profileRecord, setProfileRecord] = React.useState(profileModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Profile, idProp)
        : profileModelProp;
      setProfileRecord(record);
    };
    queryData();
  }, [idProp, profileModelProp]);
  React.useEffect(resetStateValues, [profileRecord]);
  const validations = {
    display_name: [],
    user_name: [{ type: "Required" }],
    balance: [{ type: "Required" }],
    currency: [{ type: "Required" }],
    url: [],
    bio: [],
    user_id: [{ type: "Required" }],
    token: [],
    banned: [],
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
          display_name,
          user_name,
          balance,
          currency,
          url,
          bio,
          user_id,
          token,
          banned,
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
            Profile.copyOf(profileRecord, (updated) => {
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
      {...getOverrideProps(overrides, "ProfileUpdateForm")}
      {...rest}
    >
      <TextField
        label="Display name"
        isRequired={false}
        isReadOnly={false}
        value={display_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              display_name: value,
              user_name,
              balance,
              currency,
              url,
              bio,
              user_id,
              token,
              banned,
            };
            const result = onChange(modelFields);
            value = result?.display_name ?? value;
          }
          if (errors.display_name?.hasError) {
            runValidationTasks("display_name", value);
          }
          setDisplay_name(value);
        }}
        onBlur={() => runValidationTasks("display_name", display_name)}
        errorMessage={errors.display_name?.errorMessage}
        hasError={errors.display_name?.hasError}
        {...getOverrideProps(overrides, "display_name")}
      ></TextField>
      <TextField
        label="User name"
        isRequired={true}
        isReadOnly={false}
        value={user_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              display_name,
              user_name: value,
              balance,
              currency,
              url,
              bio,
              user_id,
              token,
              banned,
            };
            const result = onChange(modelFields);
            value = result?.user_name ?? value;
          }
          if (errors.user_name?.hasError) {
            runValidationTasks("user_name", value);
          }
          setUser_name(value);
        }}
        onBlur={() => runValidationTasks("user_name", user_name)}
        errorMessage={errors.user_name?.errorMessage}
        hasError={errors.user_name?.hasError}
        {...getOverrideProps(overrides, "user_name")}
      ></TextField>
      <TextField
        label="Balance"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={balance}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              display_name,
              user_name,
              balance: value,
              currency,
              url,
              bio,
              user_id,
              token,
              banned,
            };
            const result = onChange(modelFields);
            value = result?.balance ?? value;
          }
          if (errors.balance?.hasError) {
            runValidationTasks("balance", value);
          }
          setBalance(value);
        }}
        onBlur={() => runValidationTasks("balance", balance)}
        errorMessage={errors.balance?.errorMessage}
        hasError={errors.balance?.hasError}
        {...getOverrideProps(overrides, "balance")}
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
              display_name,
              user_name,
              balance,
              currency: value,
              url,
              bio,
              user_id,
              token,
              banned,
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
        label="Url"
        isRequired={false}
        isReadOnly={false}
        value={url}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              display_name,
              user_name,
              balance,
              currency,
              url: value,
              bio,
              user_id,
              token,
              banned,
            };
            const result = onChange(modelFields);
            value = result?.url ?? value;
          }
          if (errors.url?.hasError) {
            runValidationTasks("url", value);
          }
          setUrl(value);
        }}
        onBlur={() => runValidationTasks("url", url)}
        errorMessage={errors.url?.errorMessage}
        hasError={errors.url?.hasError}
        {...getOverrideProps(overrides, "url")}
      ></TextField>
      <TextField
        label="Bio"
        isRequired={false}
        isReadOnly={false}
        value={bio}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              display_name,
              user_name,
              balance,
              currency,
              url,
              bio: value,
              user_id,
              token,
              banned,
            };
            const result = onChange(modelFields);
            value = result?.bio ?? value;
          }
          if (errors.bio?.hasError) {
            runValidationTasks("bio", value);
          }
          setBio(value);
        }}
        onBlur={() => runValidationTasks("bio", bio)}
        errorMessage={errors.bio?.errorMessage}
        hasError={errors.bio?.hasError}
        {...getOverrideProps(overrides, "bio")}
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
              display_name,
              user_name,
              balance,
              currency,
              url,
              bio,
              user_id: value,
              token,
              banned,
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
        label="Token"
        isRequired={false}
        isReadOnly={false}
        value={token}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              display_name,
              user_name,
              balance,
              currency,
              url,
              bio,
              user_id,
              token: value,
              banned,
            };
            const result = onChange(modelFields);
            value = result?.token ?? value;
          }
          if (errors.token?.hasError) {
            runValidationTasks("token", value);
          }
          setToken(value);
        }}
        onBlur={() => runValidationTasks("token", token)}
        errorMessage={errors.token?.errorMessage}
        hasError={errors.token?.hasError}
        {...getOverrideProps(overrides, "token")}
      ></TextField>
      <SwitchField
        label="Banned"
        defaultChecked={false}
        isDisabled={false}
        isChecked={banned}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              display_name,
              user_name,
              balance,
              currency,
              url,
              bio,
              user_id,
              token,
              banned: value,
            };
            const result = onChange(modelFields);
            value = result?.banned ?? value;
          }
          if (errors.banned?.hasError) {
            runValidationTasks("banned", value);
          }
          setBanned(value);
        }}
        onBlur={() => runValidationTasks("banned", banned)}
        errorMessage={errors.banned?.errorMessage}
        hasError={errors.banned?.hasError}
        {...getOverrideProps(overrides, "banned")}
      ></SwitchField>
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
          isDisabled={!(idProp || profileModelProp)}
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
              !(idProp || profileModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
