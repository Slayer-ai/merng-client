import React from "react";
import { Link } from "react-router-dom";

// MUI Stuff
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        "& > *": {
            margin: theme.spacing(1.5),
        },
    },
}));

const NotSignedNavTabs = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Link to="/">
                <Button className={classes.buttons}>Home</Button>
            </Link>
            <Link to="/login">
                <Button className={classes.buttons}>Login</Button>
            </Link>
            <Link to="/register">
                <Button className={classes.buttons}>Register</Button>
            </Link>
        </div>
    );
};

export default NotSignedNavTabs;
