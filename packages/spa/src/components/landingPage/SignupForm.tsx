import * as Yup from "yup";
import {useCallback, useState} from "react";
import {Form, Formik} from "formik";
import {Button, Grid, IconButton, InputAdornment, styled, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {UserSignupRequest} from "../../requests/UserSIgnupRequest";

export interface SignupFormValues {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    repeatPassword: string;
}

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    password: Yup.string().min(8, 'Password too short'),
    repeatPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match')
});

const StyledTextField = styled(TextField)(() => ({
    '& fieldset': {
        borderRadius: '10px'
    }
}));

const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleToggleShowPassword = () => setShowPassword(!showPassword);
    const handleSubmit = useCallback(
        (values: SignupFormValues) => {
            UserSignupRequest(values);
        }, []
    );
    return (
        <Formik
            initialValues={{
                email: '',
                firstName: '',
                lastName: '',
                password: '',
                repeatPassword: ''
            }}
            onSubmit={handleSubmit}
            validationSchema={SignupSchema}>
            {({ values, handleChange, errors, touched }) => {
                return (
                    <Form>
                        <Grid container flexDirection="column">
                            <Grid item container mt={2}>
                                <Grid item xs={10} ml={2}>
                                    <StyledTextField required fullWidth name="email" label="Email" variant="outlined" value={values.email} onChange={handleChange} error={touched.email && !!errors.email} helperText={touched.email && errors.email} />
                                </Grid>
                            </Grid>
                            <Grid item container mt={2}>
                                <Grid item xs={10} ml={2}>
                                    <StyledTextField required fullWidth name="firstName" label="First Name" variant="outlined" value={values.firstName} onChange={handleChange} error={touched.firstName && !!errors.firstName} helperText={touched.firstName && errors.firstName} />
                                </Grid>
                            </Grid>
                            <Grid item container mt={2}>
                                <Grid item xs={10} ml={2}>
                                    <StyledTextField required fullWidth name="lastName" label="Last Name" variant="outlined"  value={values.lastName} onChange={handleChange} error={touched.lastName && !!errors.lastName} helperText={touched.lastName && errors.lastName} />
                                </Grid>
                            </Grid>
                            <Grid item container mt={2}>
                                <Grid item xs={10} ml={2}>
                                    <StyledTextField required fullWidth name="password" label="Password" variant="outlined"
                                               type={showPassword ? "text" : "password"} value={values.password} onChange={handleChange}
                                               error={touched.password && !!errors.password} helperText={touched.password && errors.password}
                                               InputProps={{
                                                   endAdornment: (
                                                       <InputAdornment position="end">
                                                           <IconButton onClick={handleToggleShowPassword}>
                                                               {showPassword ? <VisibilityOff /> : <Visibility />}
                                                           </IconButton>
                                                       </InputAdornment>
                                                   )
                                               }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item container mt={2}>
                                <Grid item xs={10} ml={2}>
                                    <StyledTextField required fullWidth name="repeatPassword" label="Repeat Password" variant="outlined"
                                               type={showPassword ? "text" : "password"} value={values.repeatPassword} onChange={handleChange}
                                               error={touched.repeatPassword && !!errors.repeatPassword} helperText={touched.repeatPassword && errors.repeatPassword}
                                               InputProps={{
                                                   endAdornment: (
                                                       <InputAdornment position="end">
                                                           <IconButton onClick={handleToggleShowPassword}>
                                                               {showPassword ? <VisibilityOff /> : <Visibility />}
                                                           </IconButton>
                                                       </InputAdornment>
                                                   )
                                               }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item container mt={2}>
                                <Grid item xs={10} ml={2}>
                                    <Button variant="contained" color="secondary" type="submit" fullWidth>
                                        Create Account
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default SignupForm;