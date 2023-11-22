/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getUser } from "../graphql/queries";
import { updateUser } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function UserUpdateForm(props) {
  const {
    id: idProp,
    user: userModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    firstName: "",
    secondName: "",
    email: "",
    articleIds: [],
    commentIds: [],
    roleId: "",
    settingsId: "",
  };
  const [firstName, setFirstName] = React.useState(initialValues.firstName);
  const [secondName, setSecondName] = React.useState(initialValues.secondName);
  const [email, setEmail] = React.useState(initialValues.email);
  const [articleIds, setArticleIds] = React.useState(initialValues.articleIds);
  const [commentIds, setCommentIds] = React.useState(initialValues.commentIds);
  const [roleId, setRoleId] = React.useState(initialValues.roleId);
  const [settingsId, setSettingsId] = React.useState(initialValues.settingsId);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = userRecord
      ? { ...initialValues, ...userRecord }
      : initialValues;
    setFirstName(cleanValues.firstName);
    setSecondName(cleanValues.secondName);
    setEmail(cleanValues.email);
    setArticleIds(cleanValues.articleIds ?? []);
    setCurrentArticleIdsValue("");
    setCommentIds(cleanValues.commentIds ?? []);
    setCurrentCommentIdsValue("");
    setRoleId(cleanValues.roleId);
    setSettingsId(cleanValues.settingsId);
    setErrors({});
  };
  const [userRecord, setUserRecord] = React.useState(userModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getUser.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getUser
        : userModelProp;
      setUserRecord(record);
    };
    queryData();
  }, [idProp, userModelProp]);
  React.useEffect(resetStateValues, [userRecord]);
  const [currentArticleIdsValue, setCurrentArticleIdsValue] =
    React.useState("");
  const articleIdsRef = React.createRef();
  const [currentCommentIdsValue, setCurrentCommentIdsValue] =
    React.useState("");
  const commentIdsRef = React.createRef();
  const validations = {
    firstName: [],
    secondName: [],
    email: [],
    articleIds: [],
    commentIds: [],
    roleId: [],
    settingsId: [],
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
          firstName: firstName ?? null,
          secondName: secondName ?? null,
          email: email ?? null,
          articleIds: articleIds ?? null,
          commentIds: commentIds ?? null,
          roleId: roleId ?? null,
          settingsId: settingsId ?? null,
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
          await client.graphql({
            query: updateUser.replaceAll("__typename", ""),
            variables: {
              input: {
                id: userRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "UserUpdateForm")}
      {...rest}
    >
      <TextField
        label="First name"
        isRequired={false}
        isReadOnly={false}
        value={firstName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName: value,
              secondName,
              email,
              articleIds,
              commentIds,
              roleId,
              settingsId,
            };
            const result = onChange(modelFields);
            value = result?.firstName ?? value;
          }
          if (errors.firstName?.hasError) {
            runValidationTasks("firstName", value);
          }
          setFirstName(value);
        }}
        onBlur={() => runValidationTasks("firstName", firstName)}
        errorMessage={errors.firstName?.errorMessage}
        hasError={errors.firstName?.hasError}
        {...getOverrideProps(overrides, "firstName")}
      ></TextField>
      <TextField
        label="Second name"
        isRequired={false}
        isReadOnly={false}
        value={secondName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              secondName: value,
              email,
              articleIds,
              commentIds,
              roleId,
              settingsId,
            };
            const result = onChange(modelFields);
            value = result?.secondName ?? value;
          }
          if (errors.secondName?.hasError) {
            runValidationTasks("secondName", value);
          }
          setSecondName(value);
        }}
        onBlur={() => runValidationTasks("secondName", secondName)}
        errorMessage={errors.secondName?.errorMessage}
        hasError={errors.secondName?.hasError}
        {...getOverrideProps(overrides, "secondName")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              secondName,
              email: value,
              articleIds,
              commentIds,
              roleId,
              settingsId,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              firstName,
              secondName,
              email,
              articleIds: values,
              commentIds,
              roleId,
              settingsId,
            };
            const result = onChange(modelFields);
            values = result?.articleIds ?? values;
          }
          setArticleIds(values);
          setCurrentArticleIdsValue("");
        }}
        currentFieldValue={currentArticleIdsValue}
        label={"Article ids"}
        items={articleIds}
        hasError={errors?.articleIds?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("articleIds", currentArticleIdsValue)
        }
        errorMessage={errors?.articleIds?.errorMessage}
        setFieldValue={setCurrentArticleIdsValue}
        inputFieldRef={articleIdsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Article ids"
          isRequired={false}
          isReadOnly={false}
          value={currentArticleIdsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.articleIds?.hasError) {
              runValidationTasks("articleIds", value);
            }
            setCurrentArticleIdsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("articleIds", currentArticleIdsValue)
          }
          errorMessage={errors.articleIds?.errorMessage}
          hasError={errors.articleIds?.hasError}
          ref={articleIdsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "articleIds")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              firstName,
              secondName,
              email,
              articleIds,
              commentIds: values,
              roleId,
              settingsId,
            };
            const result = onChange(modelFields);
            values = result?.commentIds ?? values;
          }
          setCommentIds(values);
          setCurrentCommentIdsValue("");
        }}
        currentFieldValue={currentCommentIdsValue}
        label={"Comment ids"}
        items={commentIds}
        hasError={errors?.commentIds?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("commentIds", currentCommentIdsValue)
        }
        errorMessage={errors?.commentIds?.errorMessage}
        setFieldValue={setCurrentCommentIdsValue}
        inputFieldRef={commentIdsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Comment ids"
          isRequired={false}
          isReadOnly={false}
          value={currentCommentIdsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.commentIds?.hasError) {
              runValidationTasks("commentIds", value);
            }
            setCurrentCommentIdsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("commentIds", currentCommentIdsValue)
          }
          errorMessage={errors.commentIds?.errorMessage}
          hasError={errors.commentIds?.hasError}
          ref={commentIdsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "commentIds")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Role id"
        isRequired={false}
        isReadOnly={false}
        value={roleId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              secondName,
              email,
              articleIds,
              commentIds,
              roleId: value,
              settingsId,
            };
            const result = onChange(modelFields);
            value = result?.roleId ?? value;
          }
          if (errors.roleId?.hasError) {
            runValidationTasks("roleId", value);
          }
          setRoleId(value);
        }}
        onBlur={() => runValidationTasks("roleId", roleId)}
        errorMessage={errors.roleId?.errorMessage}
        hasError={errors.roleId?.hasError}
        {...getOverrideProps(overrides, "roleId")}
      ></TextField>
      <TextField
        label="Settings id"
        isRequired={false}
        isReadOnly={false}
        value={settingsId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              secondName,
              email,
              articleIds,
              commentIds,
              roleId,
              settingsId: value,
            };
            const result = onChange(modelFields);
            value = result?.settingsId ?? value;
          }
          if (errors.settingsId?.hasError) {
            runValidationTasks("settingsId", value);
          }
          setSettingsId(value);
        }}
        onBlur={() => runValidationTasks("settingsId", settingsId)}
        errorMessage={errors.settingsId?.errorMessage}
        hasError={errors.settingsId?.hasError}
        {...getOverrideProps(overrides, "settingsId")}
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
          isDisabled={!(idProp || userModelProp)}
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
              !(idProp || userModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
