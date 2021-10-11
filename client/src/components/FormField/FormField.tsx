import TextField from "@mui/material/TextField";
import { FieldRenderProps } from "react-final-form";
import { FC } from "react";

import { InputAdornment } from "@mui/material";

type FormProps = FieldRenderProps<string, any>;

const FormField: FC<FormProps> = ({ input, meta, children, ...rest }) => {
  return (
    <TextField
      error={meta.touched && meta.error}
      helperText={meta.touched && meta.error && <span> {meta.error} </span>}
      {...rest}
      {...input}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{children}</InputAdornment>
        ),
      }}
    />
  );
};
export default FormField;
