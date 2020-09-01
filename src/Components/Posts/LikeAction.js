import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router";
import { AuthContext } from "../../Context/auth";
import gql from "graphql-tag";

// MUI Stuff
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import MyTooltip from "../MyTooltip/MyTooltip";

const LikeAction = ({ user, post: { id, likeCount, likes } }) => {
    const history = useHistory();
    const [liked, setLiked] = useState(false);

    const { logout } = useContext(AuthContext);

    useEffect(() => {
        if (user && likes.find((like) => like.username === user.username)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [user, likes]);

    const [LikePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id },
        onError(err) {
            if (
                err.graphQLErrors[0].message ===
                "Authorization header must be provided"
            ) {
                logout();
                history.push("/login");
            }
        },
    });

    function handleLikeAction() {
        LikePost();
        setLiked(!liked);
    }

    const likeButton = user ? (
        liked ? (
            <MyTooltip title="Unlike" placement="top">
                <IconButton color="secondary" onClick={handleLikeAction}>
                    <FavoriteIcon />
                </IconButton>
            </MyTooltip>
        ) : (
            <MyTooltip title="Like" placement="top">
                <IconButton onClick={handleLikeAction}>
                    <FavoriteBorderRoundedIcon />
                </IconButton>
            </MyTooltip>
        )
    ) : (
        <Link to="/login">
            <MyTooltip title="Login first" placement="top">
                <IconButton>
                    <FavoriteBorderRoundedIcon />
                </IconButton>
            </MyTooltip>
        </Link>
    );

    return (
        <>
            {likeButton}
            <Typography variant="caption" color="textSecondary" component="p">
                {likeCount} Like
            </Typography>
        </>
    );
};

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likes {
                id
                username
            }
            likeCount
        }
    }
`;

export default LikeAction;
