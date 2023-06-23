import { useField } from "formik";
import React, { useCallback } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { Autocomplete, AutocompleteProps } from "@mui/material";
import { StyledTextField } from "./components/landingPage/SignupForm";
import { Moment } from "moment";
import { TextFieldProps } from "@mui/material/TextField/TextField";

export const FormDatePicker = ({ ...props }) => {
  const [field, , { setValue }] = useField(props.name);
  const onChange = useCallback(
    (value: Moment | null) => {
      setValue(value);
    },
    [setValue]
  );
  return (
    <DatePicker {...field} {...props} onChange={onChange} format="DD-MM-YYYY" />
  );
};

export interface FormAutocompleteProps<T> {
  options: T[];
  label: string;
  name: string;
  value?: T;
  required?: boolean;
}

export function FormAutocomplete<T>(
  props: FormAutocompleteProps<T> &
    Partial<AutocompleteProps<T, boolean, undefined, undefined>>
) {
  const [field, { touched, error }, { setValue, setTouched }] = useField<T>(
    props.name
  );
  const onChange = useCallback(
    (event: React.SyntheticEvent, value: T | T[] | null) => {
      setValue(value as T);
    },
    [setValue]
  );
  return (
    <Autocomplete<T, boolean, undefined, undefined>
      multiple={false}
      {...props}
      {...field}
      onChange={onChange}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          label={props.label}
          required={props.required}
          color="secondary"
          onBlur={() => setTouched(true)}
          error={touched && !!error}
          helperText={touched && error}
        />
      )}
    />
  );
}

interface FormTextInputProps {
  label: string;
  name: string;
}

export function FormTextInput<T>(
  props: FormTextInputProps & Partial<TextFieldProps>
) {
  const [field, { touched, error }, { setTouched }] = useField<T>(props.name);
  return (
    <StyledTextField
      {...props}
      {...field}
      color="secondary"
      onBlur={() => setTouched(true)}
      error={touched && !!error}
      helperText={touched && error}
    />
  );
}
