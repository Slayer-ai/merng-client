import React, { useContext } from "react";
import { AuthContext } from "../../Context/auth";

import NotSignedNavTabs from "./NotSignedNavTabs";
import SignedNavTabs from "./SignedNavTabs";

// MUI Stuff
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(2),
        backgroundColor: "#242526",
        zIndex: "2",
        position: "fixed",
        top: "0",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

const NavBar = (props) => {
    const classes = useStyles();

    const { user, logout } = useContext(AuthContext);

    return (
        <AppBar position="static" color="inherit" className={classes.root}>
            {user ? <SignedNavTabs logout={logout} /> : <NotSignedNavTabs />}
        </AppBar>
    );
};

export default NavBar;
