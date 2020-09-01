import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

// Auth Stuff
import { FETCH__POSTS__QUERY } from "../util/GraphQl";
import { AuthContext } from "../Context/auth";

// Components
import PostCard from "../Components/Posts/PostCard";
import PostForm from "../Components/Posts/PostForm";

const Home = (props) => {
    document.title = "Slayers";
    const { user } = useContext(AuthContext);

    const { loading, data } = useQuery(FETCH__POSTS__QUERY);

    const { getPosts: posts } = data ? data : [];

    return (
        <Grid container>
            <Hidden only={["sm", "xs"]}>
                <Grid item xl={3} lg={2} md={1} />
            </Hidden>
            <Hidden only={["md", "lg", "xl", "xs"]}>
                <Grid item sm={1} />
            </Hidden>
            <Grid
                item
                xl={4}
                lg={5}
                md={6}
                sm={10}
                xs={12}
                style={{ padding: "0 15px" }}
            >
                {!loading && user && <PostForm />}
                {loading ? (
                    <h1>Loading posts...</h1>
                ) : (
                    posts &&
                    posts.map((post) => <PostCard key={post.id} post={post} />)
                )}
            </Grid>
            <Hidden only={["md", "lg", "xl", "xs"]}>
                <Grid item sm={1} />
            </Hidden>

            <Hidden only={["sm", "xs"]}>
                <Grid
                    item
                    xl={2}
                    lg={3}
                    md={4}
                >
                </Grid>
            </Hidden>

            <Hidden only={["sm", "xs"]}>
                <Grid item xl={3} lg={2} md={1} />
            </Hidden>
        </Grid>
    );
};

export default Home;
