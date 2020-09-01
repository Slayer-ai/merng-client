import React, { useState } from "react";
import moment from "moment";

// MUI Stuff
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

// Icons
import MoreVertIcon from "@material-ui/icons/MoreVert";

// Components
import MyMenu from "../Menu/MyMenu/MyMenu";
import DeleteButton from "../Menu/item/DeleteButton";
import Overlay from "../overlay/Overlay";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        padding: theme.spacing(0, 0, 1, 2),
        width: "calc(100% - 2rem)",
        backgroundColor: "#333",
        color: "#ccc",
        wordBreak: "break-all",
        wordWrap: "break-all",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    usernameContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    username: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#dadada",
    },
    author: {
        padding: "0 4px",
        backgroundColor: "#5a5a5a",
        fontSize: 10,
        marginLeft: theme.spacing(0.5),
        borderRadius: 2,
    },
    time: {
        fontSize: 10,
        color: "rgba(255, 255, 255, 0.4)",
        margin: theme.spacing(-2, 0, 0.5),
    },
    body: {
        color: "#d0d0d0",
        marginRight: theme.spacing(2),
    },
}));

const Comment = ({
    user,
    postId,
    comment: { id, username, createdAt, body },
    postusername,
}) => {
    const classes = useStyles();

    const [menuOpenStatus, SetMenuOpenStatus] = useState(false);

    const deleteButton =
        user && username === user.username ? (
            <DeleteButton postId={postId} commentId={id} item={"comment"} />
        ) : null;

    const closeMenu = () => {
        SetMenuOpenStatus(false);
    };

    return (
        <div>
            <Paper className={classes.root} elevation={0}>
                <div className={classes.header}>
                    <div className={classes.usernameContainer}>
                        <Typography
                            variant="body1"
                            className={classes.username}
                            component="p"
                        >
                            {username}
                        </Typography>
                        {postusername === username && (
                            <p className={classes.author}>Author</p>
                        )}
                    </div>

                    <div>
                        <IconButton
                            aria-label="settings"
                            onClick={() => SetMenuOpenStatus(!menuOpenStatus)}
                        >
                            <MoreVertIcon
                                style={{ transform: "rotate(90deg)" }}
                            />
                        </IconButton>
                        {menuOpenStatus && (
                            <>
                                <Overlay close={closeMenu} />
                                <MyMenu>{deleteButton}</MyMenu>
                            </>
                        )}
                    </div>
                </div>
                <Typography
                    className={classes.time}
                    variant="caption"
                    component="p"
                >
                    {moment(createdAt).fromNow(true)}
                </Typography>
                <Typography
                    variant="body2"
                    className={classes.body}
                    component="p"
                >
                    {body}
                </Typography>
            </Paper>
            {/* <Typography
                variant="caption"
                className={classes.body}
                component="p"
            >
                {moment(createdAt).fromNow(true)}
            </Typography> */}
        </div>
    );
};

export default Comment;
