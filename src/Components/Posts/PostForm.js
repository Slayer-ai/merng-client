import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import "./PostForm.scss";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

// MUI Stuff
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";

// Icons
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import LoyaltyRoundedIcon from "@material-ui/icons/LoyaltyRounded";
import SentimentVerySatisfiedRoundedIcon from "@material-ui/icons/SentimentVerySatisfiedRounded";

// Components
import BadgeAvatars from "./BadgeAvatar";
import { FETCH__POSTS__QUERY } from "../../util/GraphQl";
import MyTooltip from "../MyTooltip/MyTooltip";

// Custom Hooks
import { useForm } from "../../util/CustomHook";

const createPostStyle = makeStyles((theme) => ({
    root: {
        marginBottom: "15px",
        backgroundColor: "#242526",
        overflow: "hidden",
        padding: "0 15px",
    },
    itemIcon: {
        marginRight: "10px",
    },
    error: {
        width: "100%",
        textAlign: "center",
    },
    buttonsContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 25px 15px",
    },
}));

const PostForm = (props) => {
    const classes = createPostStyle();

    const [error, setError] = useState("");

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setError("");
    };

    const { values, handleChange, handleSubmit } = useForm(createPostCallback, {
        body: "",
    });

    const [createPost] = useMutation(CREATE_POST_MUTATION, {
        variables: values,

        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH__POSTS__QUERY,
                variables: values,
            });

            data.getPosts = [result.data.createPost, ...data.getPosts];

            proxy.writeQuery({
                query: FETCH__POSTS__QUERY,
                variables: values,
                data,
            });

            values.body = "";

            handleClose();
        },
        onError(err) {
            setError(err.graphQLErrors[0].message);
        },
    });

    function createPostCallback() {
        createPost();
    }

    return (
        <Paper className={classes.root}>
            <div className="createPostContainer">
                <div className="createPostHeader">
                    <BadgeAvatars />
                    <MyTooltip title="Add Post!" placement="top">
                        <input
                            dir="auto"
                            readOnly
                            type="text"
                            placeholder="What's on your mind, Slay"
                            className="createPostFeild"
                            onClick={handleClickOpen}
                        />
                    </MyTooltip>
                </div>
                <div className="createPostSeperator"></div>
                <div className="createPostFouter">
                    <MyTooltip title="Comming soon" placement="top">
                        <div className="create__post__items">
                            <PhotoLibraryIcon className={classes.itemIcon} />
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                Photo\Video
                            </Typography>
                        </div>
                    </MyTooltip>
                    <MyTooltip title="Comming soon" placement="top">
                        <div className="create__post__items">
                            <LoyaltyRoundedIcon className={classes.itemIcon} />
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                Tag Friends
                            </Typography>
                        </div>
                    </MyTooltip>
                    <Hidden only="xs">
                        <MyTooltip title="Comming soon" placement="top">
                            <div className="create__post__items">
                                <SentimentVerySatisfiedRoundedIcon
                                    className={classes.itemIcon}
                                />
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                >
                                    Feeling\Activity
                                </Typography>
                            </div>
                        </MyTooltip>
                    </Hidden>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll="paper"
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle id="form-dialog-title">
                    Share your moment
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Left your touch to friends...
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="body"
                        multiline
                        rows="5"
                        dir="auto"
                        label="Your post"
                        type="email"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        value={values.body}
                    />
                </DialogContent>
                {error && (
                    <Typography
                        variant="caption"
                        color="secondary"
                        component="p"
                        className={classes.error}
                    >
                        {error}
                    </Typography>
                )}
                <DialogActions className={classes.buttonsContainer}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!values.body}
                        color="primary"
                    >
                        Post!
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!) {
        createPost(body: $body) {
            id
            body
            createdAt
            username
            likes {
                id
                username
                createdAt
            }
            likeCount
            comments {
                id
                body
                username
                createdAt
            }
            commentCount
        }
    }
`;

export default PostForm;
