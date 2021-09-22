import React from "react";
import styles from "./Chrome.module.scss";
import {classes} from "mg-values";

const Chrome = () => {
    return (
        <div className={classes({}, [
            styles.chrome, "unselectable"
        ])}>
            Hello World
        </div>
    );
};

export default Chrome;