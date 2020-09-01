import React from "react";
import "./MyMenu.scss";

const ScreamMenu = (props) => {
    return <div className="post__menu">{props.children}</div>;
};

export default ScreamMenu;
