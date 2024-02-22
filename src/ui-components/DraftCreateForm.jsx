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
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Draft } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function DraftCreateForm(props) {
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
    order: "",
    pickDeadline: "",
    curentPick: "",
    playersDrafted: "",
    fantasyleagueID: "",
  };
  const [order, setOrder] = React.useState(initialValues.order);
  const [pickDeadline, setPickDeadline] = React.useState(
    initialValues.pickDeadline
  );
  const [curentPick, setCurentPick] = React.useState(initialValues.curentPick);
  const [playersDrafted, setPlayersDrafted] = React.useState(
    initialValues.playersDrafted
  );
  const [fantasyleagueID, setFantasyleagueID] = React.useState(
    initialValues.fantasyleagueID
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setOrder(initialValues.order);
    setPickDeadline(initialValues.pickDeadline);
    setCurentPick(initialValues.curentPick);
    setPlayersDrafted(initialValues.playersDrafted);
    setFantasyleagueID(initialValues.fantasyleagueID);
    setErrors({});
  };
  const validations = {
    order: [{ type: "JSON" }],
    pickDeadline: [],
    curentPick: [],
    playersDrafted: [{ type: "JSON" }],
    fantasyleagueID: [],
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
          order,
          pickDeadline,
          curentPick,
          playersDrafted,
          fantasyleagueID,
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
          await DataStore.save(new Draft(modelFields));
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
      {...getOverrideProps(overrides, "DraftCreateForm")}
      {...rest}
    >
      <TextAreaField
        label="Order"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              order: value,
              pickDeadline,
              curentPick,
              playersDrafted,
              fantasyleagueID,
            };
            const result = onChange(modelFields);
            value = result?.order ?? value;
          }
          if (errors.order?.hasError) {
            runValidationTasks("order", value);
          }
          setOrder(value);
        }}
        onBlur={() => runValidationTasks("order", order)}
        errorMessage={errors.order?.errorMessage}
        hasError={errors.order?.hasError}
        {...getOverrideProps(overrides, "order")}
      ></TextAreaField>
      <TextField
        label="Pick deadline"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={pickDeadline && convertToLocal(new Date(pickDeadline))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              order,
              pickDeadline: value,
              curentPick,
              playersDrafted,
              fantasyleagueID,
            };
            const result = onChange(modelFields);
            value = result?.pickDeadline ?? value;
          }
          if (errors.pickDeadline?.hasError) {
            runValidationTasks("pickDeadline", value);
          }
          setPickDeadline(value);
        }}
        onBlur={() => runValidationTasks("pickDeadline", pickDeadline)}
        errorMessage={errors.pickDeadline?.errorMessage}
        hasError={errors.pickDeadline?.hasError}
        {...getOverrideProps(overrides, "pickDeadline")}
      ></TextField>
      <TextField
        label="Curent pick"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={curentPick}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              order,
              pickDeadline,
              curentPick: value,
              playersDrafted,
              fantasyleagueID,
            };
            const result = onChange(modelFields);
            value = result?.curentPick ?? value;
          }
          if (errors.curentPick?.hasError) {
            runValidationTasks("curentPick", value);
          }
          setCurentPick(value);
        }}
        onBlur={() => runValidationTasks("curentPick", curentPick)}
        errorMessage={errors.curentPick?.errorMessage}
        hasError={errors.curentPick?.hasError}
        {...getOverrideProps(overrides, "curentPick")}
      ></TextField>
      <TextAreaField
        label="Players drafted"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              order,
              pickDeadline,
              curentPick,
              playersDrafted: value,
              fantasyleagueID,
            };
            const result = onChange(modelFields);
            value = result?.playersDrafted ?? value;
          }
          if (errors.playersDrafted?.hasError) {
            runValidationTasks("playersDrafted", value);
          }
          setPlayersDrafted(value);
        }}
        onBlur={() => runValidationTasks("playersDrafted", playersDrafted)}
        errorMessage={errors.playersDrafted?.errorMessage}
        hasError={errors.playersDrafted?.hasError}
        {...getOverrideProps(overrides, "playersDrafted")}
      ></TextAreaField>
      <TextField
        label="Fantasyleague id"
        isRequired={false}
        isReadOnly={false}
        value={fantasyleagueID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              order,
              pickDeadline,
              curentPick,
              playersDrafted,
              fantasyleagueID: value,
            };
            const result = onChange(modelFields);
            value = result?.fantasyleagueID ?? value;
          }
          if (errors.fantasyleagueID?.hasError) {
            runValidationTasks("fantasyleagueID", value);
          }
          setFantasyleagueID(value);
        }}
        onBlur={() => runValidationTasks("fantasyleagueID", fantasyleagueID)}
        errorMessage={errors.fantasyleagueID?.errorMessage}
        hasError={errors.fantasyleagueID?.hasError}
        {...getOverrideProps(overrides, "fantasyleagueID")}
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
