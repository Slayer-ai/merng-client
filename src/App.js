import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./Context/auth";

// Global Styles
import "./App.scss";

// Components
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import NavBar from "./Components/MenuBar/NavBar";
import SinglePost from "./Pages/SinglePost";

// MUI Stuff
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

// Auth Stuff
import AuthRoute from "./util/AuthRoute";

function App() {
    const theme = createMuiTheme({
        palette: {
            type: "dark",
            primary: {
                light: "#4b9fea",
                main: "#1e88e5",
                dark: "#155fa0",
            },
            secondary: {
                light: "#ff6333",
                main: "#ff3d00",
                dark: "#b22a00",
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <Router>
                    <div className="body">
                        <NavBar />
                        <div className="pages">
                            <Route exact path="/" component={Home} />
                            <AuthRoute exact path="/login" component={Login} />
                            <AuthRoute
                                exact
                                path="/register"
                                component={Register}
                            />
                            <Route
                                exact
                                path="/posts/:postId"
                                component={SinglePost}
                            />
                        </div>
                    </div>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
