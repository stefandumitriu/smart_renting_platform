import { Form, Formik } from "formik";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  styled,
  TextField,
} from "@mui/material";
import * as Yup from "yup";
import { useCallback, useContext, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { UserLoginRequest } from "../../requests/UserSignupRequest";
import { AuthContext } from "../../contexts/AuthContext";

interface LoginFormProps {
  handleClose: () => void;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Password too short"),
});

const StyledTextField = styled(TextField)(() => ({
  "& fieldset": {
    borderRadius: "10px",
  },
}));

const LoginForm = (props: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleToggleShowPassword = () => setShowPassword(!showPassword);
  const { setCurrentUser } = useContext(AuthContext);
  const handleSubmit = useCallback(
    async (values: LoginFormValues) => {
      const user = await UserLoginRequest(values);
      setCurrentUser(user);
      props.handleClose();
    },
    [setCurrentUser, props]
  );
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={LoginSchema}
    >
      {({ values, handleChange, errors, touched }) => {
        return (
          <Form>
            <Grid container flexDirection="column">
              <Grid item container mt={2}>
                <Grid item xs={10} ml={2}>
                  <StyledTextField
                    required
                    fullWidth
                    name="email"
                    label="Email"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
              </Grid>
              <Grid item container mt={2}>
                <Grid item xs={10} ml={2}>
                  <StyledTextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange}
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleToggleShowPassword}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item container mt={2}>
                <Grid item xs={10} ml={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    fullWidth
                  >
                    Log in
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
