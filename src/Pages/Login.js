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
import VerifiedUserRoundedIcon from "@material-ui/icons/VerifiedUserRounded";
import CircularProgress from "@material-ui/core/CircularProgress";

const Login = (props) => {
    document.title = "Login";

    const classes = formStyle();

    const context = useContext(AuthContext);

    const { handleChange, handleSubmit, values } = useForm(loginUserCallback, {
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }) {
            context.login(userData);
            props.history.push("/");
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values,
    });

    function loginUserCallback() {
        loginUser();
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <div className={classes.formHeader}>
                    <VerifiedUserRoundedIcon className={classes.icon} />
                    <h2 className={classes.header}>Login</h2>
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
                        Login
                    </Button>
                    {!loading && (
                        <Typography
                            className={classes.link}
                            variant="body1"
                            component="p"
                        >
                            Don't have an account ?{" "}
                            <Link to="/register">Register</Link>
                        </Typography>
                    )}
                </form>
            </Paper>
        </div>
    );
};

const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            email
            username
            createdAt
            token
        }
    }
`;

export default Login;
