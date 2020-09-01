import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

// Components
import PostCard from "../Components/Posts/PostCard";

const SinglePost = (props) => {
    const postId = props.match.params.postId;

    const [error, setError] = useState("");

    const { data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId,
        },
        onError(err) {
            console.log(err);
            if (err.graphQLErrors[0].message === "Error: Post not found") {
                setError("Post not found or must be deleted");
            }
        },
    });

    const { getPost: post } = data ? data : {};

    return error ? (
        <h3 style={{ textAlign: "center" }}>{error}</h3>
    ) : (
        <Grid container>
            <Hidden only={["sm", "xs"]}>
                <Grid item xl={4} md={3} />
            </Hidden>
            <Hidden only={["md", "lg", "xl", "xs"]}>
                <Grid item sm={2} />
            </Hidden>
            <Grid
                item
                xl={4}
                md={6}
                sm={8}
                xs={12}
                style={{ padding: "0 15px" }}
            >
                {!post ? <h3>Loading post...</h3> : <PostCard post={post} />}
            </Grid>
            <Hidden only={["md", "lg", "xl", "xs"]}>
                <Grid item sm={2} />
            </Hidden>

            <Hidden only={["sm", "xs"]}>
                <Grid item xl={4} md={3} />
            </Hidden>
        </Grid>
    );
};

const FETCH_POST_QUERY = gql`
    query($postId: ID!) {
        getPost(postId: $postId) {
            id
            body
            createdAt
            username
            likeCount
            commentCount
            likes {
                username
            }
            comments {
                id
                username
                body
                createdAt
            }
        }
    }
`;

export default SinglePost;
