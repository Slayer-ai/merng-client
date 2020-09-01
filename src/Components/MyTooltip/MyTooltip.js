import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: "rgba(0, 0, 0, 0.87)",
    },
}));

const MyTooltip = (props) => {
    const classes = useStylesBootstrap();

    return <Tooltip arrow classes={classes} {...props} />;
};

export default MyTooltip;
