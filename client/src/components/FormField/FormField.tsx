import TextField from "@mui/material/TextField";
import { FieldRenderProps } from "react-final-form";
import { FC } from "react";

import { InputAdornment } from "@mui/material";
import { errorMessageSelector } from "@redux/selectors/error";
import { useSelector } from "react-redux";

type FormProps = FieldRenderProps<string, any>;

const FormField: FC<FormProps> = ({ input, meta, children, ...rest }) => {
  const errorMessage = useSelector(errorMessageSelector);

  return (
    <TextField
      error={(meta.touched && meta.error) || errorMessage}
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
