import React, { useState } from "react";
import { useHistory } from "react-router";
import "./DeleteButton.scss";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

// MUI Stuff
import HighlightOff from "@material-ui/icons/HighlightOff";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

// QUERY
import { FETCH__POSTS__QUERY } from "../../../util/GraphQl";

const DeleteScream = (props) => {
    const history = useHistory();

    const { postId, item, commentId } = props;

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

    const [dialogState, setDialogState] = useState(false);

    const [deletePostOrComment] = useMutation(mutation, {
        update(proxy) {
            handleClose();
            if (!commentId) {
                const data = proxy.readQuery({ query: FETCH__POSTS__QUERY });
                data.getPosts = data.getPosts.filter(
                    (post) => post.id !== postId
                );
                proxy.writeQuery({ query: FETCH__POSTS__QUERY, data });
                history.push("/");
            }
        },
        variables: {
            postId,
            commentId,
        },
    });

    const handleClose = () => {
        setDialogState(false);
    };

    const handleOpen = () => {
        setDialogState(true);
    };

    const handleDelete = () => {
        deletePostOrComment();
    };
    return (
        <>
            <div className="delete__button" onClick={handleOpen}>
                <HighlightOff color="inherit" className="icon" />
                <p>Delete {item}</p>
            </div>
            <Dialog open={dialogState} onClose={handleClose}>
                <DialogTitle>Are You Sur?</DialogTitle>
                <DialogContent>
                    You will not be able to reach this scream again
                </DialogContent>
                <DialogActions>
                    <Button color="inherit" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button color="inherit" onClick={handleDelete}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`;

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId) {
            id
            comments {
                id
                username
                createdAt
                body
            }
            commentCount
        }
    }
`;

export default DeleteScream;
