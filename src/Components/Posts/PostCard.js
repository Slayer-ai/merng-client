import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

// MUI Stuff
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

// Icons
import QuestionAnswerRoundedIcon from "@material-ui/icons/QuestionAnswerRounded";
import MoreVertIcon from "@material-ui/icons/MoreVert";

// Components
import { AuthContext } from "../../Context/auth";
import MyMenu from "../Menu/MyMenu/MyMenu";
import DeleteButton from "../Menu/item/DeleteButton";
import Overlay from "../overlay/Overlay";
import LikeAction from "./LikeAction";
import Comment from "./Comment";
import MyTooltip from "../MyTooltip/MyTooltip";

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: "15px",
        backgroundColor: "#242526",
        position: "relative",
    },
    username: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
        marginBottom: "-8px",
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    actionsContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    avatar: {},
    avatarImage: {
        width: "100%",
        height: "100%",
    },
    content: {
        margin: "-10px 0",
        wordWrap: "break-word",
    },
    seperator: {
        height: ".5px",
        margin: "auto",
        width: "calc(100% - 40px)",
        backgroundColor: "#444",
    },
    commentForm: {
        width: "calc(100% - 36px)",
        margin: "auto",
        marginBottom: "10px",
        borderRadius: "3px",
    },
    commentFeild: {
        padding: "8px 12px",
        width: "100%",
        borderRadius: "3px",
        fontSize: "14px",
        backgroundColor: "#3a3b3c",
        border: "none",
        outline: "none",
        color: "#B9B9B9",
    },
    time: {
        fontSize: "11px",
    },
}));

const PostCard = ({
    post: {
        id,
        body,
        createdAt,
        username,
        likeCount,
        likes,
        commentCount,
        comments,
    },
}) => {
    const { user } = useContext(AuthContext);

    const classes = useStyles();

    const [commentBody, setCommentBody] = useState("");

    const [expanded, setExpanded] = useState(false);

    const [menuOpenStatus, SetMenuOpenStatus] = useState(false);

    const [createComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update() {
            setCommentBody("");
        },
        variables: {
            postId: id,
            body: commentBody,
        },
    });

    const deleteButton =
        user && username === user.username ? (
            <DeleteButton postId={id} item={"post"} />
        ) : null;

    const mapComments = comments
        ? comments.map((comment) => (
              <Comment
                  key={comment.id}
                  user={user}
                  postId={id}
                  comment={comment}
                  postusername={username}
              />
          ))
        : null;

    const closeMenu = () => {
        SetMenuOpenStatus(false);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const hundleSubmitComment = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (commentBody.trim() === "") {
            return;
        }
        createComment();
        setCommentBody("");
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <CardMedia
                            className={classes.avatarImage}
                            image="https://scontent.falg3-1.fna.fbcdn.net/v/t1.0-9/84527914_786980351814087_342786588343795712_o.jpg?_nc_cat=104&_nc_sid=09cbfe&_nc_eui2=AeF0_NbzRphzi2c9emlKP5TygDs1tC393ISAOzW0Lf3chAQN6lnvYCxoevxv0IWZ_V5io3rVxMvdBoTcQR6_Fjfk&_nc_ohc=PPITU6WDz-MAX8A7jQo&_nc_ht=scontent.falg3-1.fna&oh=b0fe36f853a6daaa1c8c61ff0fcdf839&oe=5F70E54F"
                        />
                    </Avatar>
                }
                action={
                    <>
                        <MyTooltip title="Menu" placement="top">
                            <IconButton
                                aria-label="settings"
                                onClick={() =>
                                    SetMenuOpenStatus(!menuOpenStatus)
                                }
                            >
                                <MoreVertIcon
                                    style={{ transform: "rotate(90deg)" }}
                                />
                            </IconButton>
                        </MyTooltip>
                        {menuOpenStatus && (
                            <>
                                <Overlay close={closeMenu} />
                                <MyMenu>{deleteButton}</MyMenu>
                            </>
                        )}
                    </>
                }
                title={
                    <Typography
                        variant="subtitle1"
                        component="p"
                        className={classes.username}
                    >
                        {username}
                    </Typography>
                }
                subheader={
                    <Typography
                        variant="caption"
                        color="textSecondary"
                        component={Link}
                        to={`/posts/${id}`}
                        className={classes.time}
                    >
                        {moment(createdAt).fromNow(true)}
                    </Typography>
                }
            />
            <CardContent className={classes.content}>
                <Typography color="textSecondary" dir="auto" component="h6">
                    {body}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <LikeAction user={user} post={{ id, likeCount, likes }} />
                <div
                    className={classes.actionsContainer}
                    style={{ marginLeft: "auto" }}
                >
                    <Typography
                        variant="caption"
                        color="textSecondary"
                        component="p"
                    >
                        {commentCount} Comment
                    </Typography>
                    <MyTooltip title="Comments" placement="top">
                        <IconButton
                            aria-label="share"
                            onClick={handleExpandClick}
                        >
                            <QuestionAnswerRoundedIcon />
                        </IconButton>
                    </MyTooltip>
                </div>
            </CardActions>
            {comments.length && expanded ? (
                <div className={classes.seperator}></div>
            ) : null}
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {expanded && mapComments}
                {comments.length ? (
                    <div
                        className={classes.seperator}
                        style={{ marginBottom: "20px" }}
                    ></div>
                ) : null}
                {user && (
                    <form
                        onSubmit={hundleSubmitComment}
                        className={classes.commentForm}
                    >
                        <input
                            dir="auto"
                            type="text"
                            placeholder="Type a comment!"
                            autoFocus
                            value={commentBody}
                            onChange={(event) =>
                                setCommentBody(event.target.value)
                            }
                            className={classes.commentFeild}
                        />
                    </form>
                )}
            </Collapse>
        </Card>
    );
};

const SUBMIT_COMMENT_MUTATION = gql`
    mutation($postId: ID!, $body: String!) {
        createComment(postId: $postId, body: $body) {
            id
            body
            username
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

export default PostCard;
