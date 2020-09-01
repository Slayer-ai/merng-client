import React from "react";

// MUI Stuff
import IconButton from "@material-ui/core/IconButton";

// MUI Icons
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

// Components
import MyTooltip from "../MyTooltip/MyTooltip";

function SignedNavTabs({ logout }) {
    return (
        <div
            style={{
                height: "57px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
            }}
        >
            <h2 style={{ padding: "0 1rem", margin: "0px" }}>Slayers</h2>
            <MyTooltip title="Log out" placement="left">
                <IconButton onClick={logout}>
                    <ExitToAppIcon />
                </IconButton>
            </MyTooltip>
        </div>
    );
}

export default SignedNavTabs;
