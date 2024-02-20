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
export default function DraftUpdateForm(props) {
  const {
    id: idProp,
    draft: draftModelProp,
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
  };
  const [order, setOrder] = React.useState(initialValues.order);
  const [pickDeadline, setPickDeadline] = React.useState(
    initialValues.pickDeadline
  );
  const [curentPick, setCurentPick] = React.useState(initialValues.curentPick);
  const [playersDrafted, setPlayersDrafted] = React.useState(
    initialValues.playersDrafted
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = draftRecord
      ? { ...initialValues, ...draftRecord }
      : initialValues;
    setOrder(
      typeof cleanValues.order === "string"
        ? cleanValues.order
        : JSON.stringify(cleanValues.order)
    );
    setPickDeadline(cleanValues.pickDeadline);
    setCurentPick(cleanValues.curentPick);
    setPlayersDrafted(
      typeof cleanValues.playersDrafted === "string"
        ? cleanValues.playersDrafted
        : JSON.stringify(cleanValues.playersDrafted)
    );
    setErrors({});
  };
  const [draftRecord, setDraftRecord] = React.useState(draftModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Draft, idProp)
        : draftModelProp;
      setDraftRecord(record);
    };
    queryData();
  }, [idProp, draftModelProp]);
  React.useEffect(resetStateValues, [draftRecord]);
  const validations = {
    order: [{ type: "JSON" }],
    pickDeadline: [],
    curentPick: [],
    playersDrafted: [{ type: "JSON" }],
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
            Draft.copyOf(draftRecord, (updated) => {
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
      {...getOverrideProps(overrides, "DraftUpdateForm")}
      {...rest}
    >
      <TextAreaField
        label="Order"
        isRequired={false}
        isReadOnly={false}
        value={order}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              order: value,
              pickDeadline,
              curentPick,
              playersDrafted,
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
        value={playersDrafted}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              order,
              pickDeadline,
              curentPick,
              playersDrafted: value,
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
          isDisabled={!(idProp || draftModelProp)}
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
              !(idProp || draftModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
