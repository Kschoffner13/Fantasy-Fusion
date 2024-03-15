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
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { FantasyLeague } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function FantasyLeagueUpdateForm(props) {
  const {
    id: idProp,
    fantasyLeague: fantasyLeagueModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Name: "",
    OwnerID: "",
    Properties: "",
    DraftDate: "",
    TradeDeadline: "",
    PlayoffStartDate: "",
    PlayoffTeams: "",
    PlayoffMatchupLength: "",
    WeeklyPickups: "",
    VetoVoteEnabled: false,
    Schedule: "",
  };
  const [Name, setName] = React.useState(initialValues.Name);
  const [OwnerID, setOwnerID] = React.useState(initialValues.OwnerID);
  const [Properties, setProperties] = React.useState(initialValues.Properties);
  const [DraftDate, setDraftDate] = React.useState(initialValues.DraftDate);
  const [TradeDeadline, setTradeDeadline] = React.useState(
    initialValues.TradeDeadline
  );
  const [PlayoffStartDate, setPlayoffStartDate] = React.useState(
    initialValues.PlayoffStartDate
  );
  const [PlayoffTeams, setPlayoffTeams] = React.useState(
    initialValues.PlayoffTeams
  );
  const [PlayoffMatchupLength, setPlayoffMatchupLength] = React.useState(
    initialValues.PlayoffMatchupLength
  );
  const [WeeklyPickups, setWeeklyPickups] = React.useState(
    initialValues.WeeklyPickups
  );
  const [VetoVoteEnabled, setVetoVoteEnabled] = React.useState(
    initialValues.VetoVoteEnabled
  );
  const [Schedule, setSchedule] = React.useState(initialValues.Schedule);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = fantasyLeagueRecord
      ? { ...initialValues, ...fantasyLeagueRecord }
      : initialValues;
    setName(cleanValues.Name);
    setOwnerID(cleanValues.OwnerID);
    setProperties(
      typeof cleanValues.Properties === "string" ||
        cleanValues.Properties === null
        ? cleanValues.Properties
        : JSON.stringify(cleanValues.Properties)
    );
    setDraftDate(cleanValues.DraftDate);
    setTradeDeadline(cleanValues.TradeDeadline);
    setPlayoffStartDate(cleanValues.PlayoffStartDate);
    setPlayoffTeams(cleanValues.PlayoffTeams);
    setPlayoffMatchupLength(cleanValues.PlayoffMatchupLength);
    setWeeklyPickups(cleanValues.WeeklyPickups);
    setVetoVoteEnabled(cleanValues.VetoVoteEnabled);
    setSchedule(
      typeof cleanValues.Schedule === "string" || cleanValues.Schedule === null
        ? cleanValues.Schedule
        : JSON.stringify(cleanValues.Schedule)
    );
    setErrors({});
  };
  const [fantasyLeagueRecord, setFantasyLeagueRecord] = React.useState(
    fantasyLeagueModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(FantasyLeague, idProp)
        : fantasyLeagueModelProp;
      setFantasyLeagueRecord(record);
    };
    queryData();
  }, [idProp, fantasyLeagueModelProp]);
  React.useEffect(resetStateValues, [fantasyLeagueRecord]);
  const validations = {
    Name: [],
    OwnerID: [],
    Properties: [{ type: "JSON" }],
    DraftDate: [],
    TradeDeadline: [],
    PlayoffStartDate: [],
    PlayoffTeams: [],
    PlayoffMatchupLength: [],
    WeeklyPickups: [],
    VetoVoteEnabled: [],
    Schedule: [{ type: "JSON" }],
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
          Name,
          OwnerID,
          Properties,
          DraftDate,
          TradeDeadline,
          PlayoffStartDate,
          PlayoffTeams,
          PlayoffMatchupLength,
          WeeklyPickups,
          VetoVoteEnabled,
          Schedule,
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
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await DataStore.save(
            FantasyLeague.copyOf(fantasyLeagueRecord, (updated) => {
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
      {...getOverrideProps(overrides, "FantasyLeagueUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={Name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name: value,
              OwnerID,
              Properties,
              DraftDate,
              TradeDeadline,
              PlayoffStartDate,
              PlayoffTeams,
              PlayoffMatchupLength,
              WeeklyPickups,
              VetoVoteEnabled,
              Schedule,
            };
            const result = onChange(modelFields);
            value = result?.Name ?? value;
          }
          if (errors.Name?.hasError) {
            runValidationTasks("Name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("Name", Name)}
        errorMessage={errors.Name?.errorMessage}
        hasError={errors.Name?.hasError}
        {...getOverrideProps(overrides, "Name")}
      ></TextField>
      <TextField
        label="Owner id"
        isRequired={false}
        isReadOnly={false}
        value={OwnerID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              OwnerID: value,
              Properties,
              DraftDate,
              TradeDeadline,
              PlayoffStartDate,
              PlayoffTeams,
              PlayoffMatchupLength,
              WeeklyPickups,
              VetoVoteEnabled,
              Schedule,
            };
            const result = onChange(modelFields);
            value = result?.OwnerID ?? value;
          }
          if (errors.OwnerID?.hasError) {
            runValidationTasks("OwnerID", value);
          }
          setOwnerID(value);
        }}
        onBlur={() => runValidationTasks("OwnerID", OwnerID)}
        errorMessage={errors.OwnerID?.errorMessage}
        hasError={errors.OwnerID?.hasError}
        {...getOverrideProps(overrides, "OwnerID")}
      ></TextField>
      <TextAreaField
        label="Properties"
        isRequired={false}
        isReadOnly={false}
        value={Properties}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              OwnerID,
              Properties: value,
              DraftDate,
              TradeDeadline,
              PlayoffStartDate,
              PlayoffTeams,
              PlayoffMatchupLength,
              WeeklyPickups,
              VetoVoteEnabled,
              Schedule,
            };
            const result = onChange(modelFields);
            value = result?.Properties ?? value;
          }
          if (errors.Properties?.hasError) {
            runValidationTasks("Properties", value);
          }
          setProperties(value);
        }}
        onBlur={() => runValidationTasks("Properties", Properties)}
        errorMessage={errors.Properties?.errorMessage}
        hasError={errors.Properties?.hasError}
        {...getOverrideProps(overrides, "Properties")}
      ></TextAreaField>
      <TextField
        label="Draft date"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={DraftDate && convertToLocal(new Date(DraftDate))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              Name,
              OwnerID,
              Properties,
              DraftDate: value,
              TradeDeadline,
              PlayoffStartDate,
              PlayoffTeams,
              PlayoffMatchupLength,
              WeeklyPickups,
              VetoVoteEnabled,
              Schedule,
            };
            const result = onChange(modelFields);
            value = result?.DraftDate ?? value;
          }
          if (errors.DraftDate?.hasError) {
            runValidationTasks("DraftDate", value);
          }
          setDraftDate(value);
        }}
        onBlur={() => runValidationTasks("DraftDate", DraftDate)}
        errorMessage={errors.DraftDate?.errorMessage}
        hasError={errors.DraftDate?.hasError}
        {...getOverrideProps(overrides, "DraftDate")}
      ></TextField>
      <TextField
        label="Trade deadline"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={TradeDeadline && convertToLocal(new Date(TradeDeadline))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              Name,
              OwnerID,
              Properties,
              DraftDate,
              TradeDeadline: value,
              PlayoffStartDate,
              PlayoffTeams,
              PlayoffMatchupLength,
              WeeklyPickups,
              VetoVoteEnabled,
              Schedule,
            };
            const result = onChange(modelFields);
            value = result?.TradeDeadline ?? value;
          }
          if (errors.TradeDeadline?.hasError) {
            runValidationTasks("TradeDeadline", value);
          }
          setTradeDeadline(value);
        }}
        onBlur={() => runValidationTasks("TradeDeadline", TradeDeadline)}
        errorMessage={errors.TradeDeadline?.errorMessage}
        hasError={errors.TradeDeadline?.hasError}
        {...getOverrideProps(overrides, "TradeDeadline")}
      ></TextField>
      <TextField
        label="Playoff start date"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={PlayoffStartDate && convertToLocal(new Date(PlayoffStartDate))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              Name,
              OwnerID,
              Properties,
              DraftDate,
              TradeDeadline,
              PlayoffStartDate: value,
              PlayoffTeams,
              PlayoffMatchupLength,
              WeeklyPickups,
              VetoVoteEnabled,
              Schedule,
            };
            const result = onChange(modelFields);
            value = result?.PlayoffStartDate ?? value;
          }
          if (errors.PlayoffStartDate?.hasError) {
            runValidationTasks("PlayoffStartDate", value);
          }
          setPlayoffStartDate(value);
        }}
        onBlur={() => runValidationTasks("PlayoffStartDate", PlayoffStartDate)}
        errorMessage={errors.PlayoffStartDate?.errorMessage}
        hasError={errors.PlayoffStartDate?.hasError}
        {...getOverrideProps(overrides, "PlayoffStartDate")}
      ></TextField>
      <TextField
        label="Playoff teams"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={PlayoffTeams}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              OwnerID,
              Properties,
              DraftDate,
              TradeDeadline,
              PlayoffStartDate,
              PlayoffTeams: value,
              PlayoffMatchupLength,
              WeeklyPickups,
              VetoVoteEnabled,
              Schedule,
            };
            const result = onChange(modelFields);
            value = result?.PlayoffTeams ?? value;
          }
          if (errors.PlayoffTeams?.hasError) {
            runValidationTasks("PlayoffTeams", value);
          }
          setPlayoffTeams(value);
        }}
        onBlur={() => runValidationTasks("PlayoffTeams", PlayoffTeams)}
        errorMessage={errors.PlayoffTeams?.errorMessage}
        hasError={errors.PlayoffTeams?.hasError}
        {...getOverrideProps(overrides, "PlayoffTeams")}
      ></TextField>
      <TextField
        label="Playoff matchup length"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={PlayoffMatchupLength}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              OwnerID,
              Properties,
              DraftDate,
              TradeDeadline,
              PlayoffStartDate,
              PlayoffTeams,
              PlayoffMatchupLength: value,
              WeeklyPickups,
              VetoVoteEnabled,
              Schedule,
            };
            const result = onChange(modelFields);
            value = result?.PlayoffMatchupLength ?? value;
          }
          if (errors.PlayoffMatchupLength?.hasError) {
            runValidationTasks("PlayoffMatchupLength", value);
          }
          setPlayoffMatchupLength(value);
        }}
        onBlur={() =>
          runValidationTasks("PlayoffMatchupLength", PlayoffMatchupLength)
        }
        errorMessage={errors.PlayoffMatchupLength?.errorMessage}
        hasError={errors.PlayoffMatchupLength?.hasError}
        {...getOverrideProps(overrides, "PlayoffMatchupLength")}
      ></TextField>
      <TextField
        label="Weekly pickups"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={WeeklyPickups}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Name,
              OwnerID,
              Properties,
              DraftDate,
              TradeDeadline,
              PlayoffStartDate,
              PlayoffTeams,
              PlayoffMatchupLength,
              WeeklyPickups: value,
              VetoVoteEnabled,
              Schedule,
            };
            const result = onChange(modelFields);
            value = result?.WeeklyPickups ?? value;
          }
          if (errors.WeeklyPickups?.hasError) {
            runValidationTasks("WeeklyPickups", value);
          }
          setWeeklyPickups(value);
        }}
        onBlur={() => runValidationTasks("WeeklyPickups", WeeklyPickups)}
        errorMessage={errors.WeeklyPickups?.errorMessage}
        hasError={errors.WeeklyPickups?.hasError}
        {...getOverrideProps(overrides, "WeeklyPickups")}
      ></TextField>
      <SwitchField
        label="Veto vote enabled"
        defaultChecked={false}
        isDisabled={false}
        isChecked={VetoVoteEnabled}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              Name,
              OwnerID,
              Properties,
              DraftDate,
              TradeDeadline,
              PlayoffStartDate,
              PlayoffTeams,
              PlayoffMatchupLength,
              WeeklyPickups,
              VetoVoteEnabled: value,
              Schedule,
            };
            const result = onChange(modelFields);
            value = result?.VetoVoteEnabled ?? value;
          }
          if (errors.VetoVoteEnabled?.hasError) {
            runValidationTasks("VetoVoteEnabled", value);
          }
          setVetoVoteEnabled(value);
        }}
        onBlur={() => runValidationTasks("VetoVoteEnabled", VetoVoteEnabled)}
        errorMessage={errors.VetoVoteEnabled?.errorMessage}
        hasError={errors.VetoVoteEnabled?.hasError}
        {...getOverrideProps(overrides, "VetoVoteEnabled")}
      ></SwitchField>
      <TextAreaField
        label="Schedule"
        isRequired={false}
        isReadOnly={false}
        value={Schedule}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              OwnerID,
              Properties,
              DraftDate,
              TradeDeadline,
              PlayoffStartDate,
              PlayoffTeams,
              PlayoffMatchupLength,
              WeeklyPickups,
              VetoVoteEnabled,
              Schedule: value,
            };
            const result = onChange(modelFields);
            value = result?.Schedule ?? value;
          }
          if (errors.Schedule?.hasError) {
            runValidationTasks("Schedule", value);
          }
          setSchedule(value);
        }}
        onBlur={() => runValidationTasks("Schedule", Schedule)}
        errorMessage={errors.Schedule?.errorMessage}
        hasError={errors.Schedule?.hasError}
        {...getOverrideProps(overrides, "Schedule")}
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
          isDisabled={!(idProp || fantasyLeagueModelProp)}
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
              !(idProp || fantasyLeagueModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
