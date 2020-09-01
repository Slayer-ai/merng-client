import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { formStyle } from "./FormStyle";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AuthContext } from "../Context/auth";

// Custom Hook
import { useForm } from "../util/CustomHook";

// MUI Stuff
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

// ICons
import VerifiedUserRoundedIcon from "@material-ui/icons/VerifiedUserRounded";

const Register = (props) => {
    document.title = "Register";
    const classes = formStyle();

    const context = useContext(AuthContext);

    const { handleChange, handleSubmit, values } = useForm(registerUser, {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, { data: { register: userData } }) {
            context.login(userData);
            props.history.push("/");
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values,
    });

    function registerUser() {
        addUser();
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <div className={classes.formHeader}>
                    <VerifiedUserRoundedIcon className={classes.icon} />
                    <h2 className={classes.header}>Register</h2>
                </div>
                <form
                    className={classes.form}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <TextField
                        label="Username"
                        type="text"
                        name="username"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        helperText={errors.username}
                        error={errors.username ? true : false}
                        className={classes.field}
                        onChange={handleChange}
                        value={values.username}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        helperText={errors.email}
                        error={errors.email ? true : false}
                        className={classes.field}
                        onChange={handleChange}
                        value={values.email}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        helperText={errors.password}
                        error={errors.password ? true : false}
                        className={classes.field}
                        onChange={handleChange}
                        value={values.password}
                    />
                    <TextField
                        label="Confirm Passowrd"
                        type="password"
                        name="confirmPassword"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        helperText={errors.confirmPassword}
                        error={errors.confirmPassword ? true : false}
                        className={classes.field}
                        onChange={handleChange}
                        value={values.confirmPassword}
                    />
                    {errors.general && (
                        <Typography
                            className={classes.generalError}
                            variant="body1"
                            component="p"
                        >
                            {errors.general}
                        </Typography>
                    )}
                    <Button
                        className={classes.submitButton}
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                    >
                        {loading && (
                            <CircularProgress
                                size={30}
                                className={classes.spiner}
                            />
                        )}
                        Register
                    </Button>
                    {!loading && (
                        <Typography
                            className={classes.link}
                            variant="body1"
                            component="p"
                        >
                            Already have account ?{" "}
                            <Link to="/login">Login</Link>
                        </Typography>
                    )}
                </form>
            </Paper>
        </div>
    );
};

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            email
            username
            createdAt
            token
        }
    }
`;

export default Register;
