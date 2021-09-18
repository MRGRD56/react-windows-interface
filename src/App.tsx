import React, {FC} from "react";
import "./App.scss";
import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import DesktopEnvironment from "./components/GUI/DesktopEnvironment/DesktopEnvironment";

const App: FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/">
                    <DesktopEnvironment className="fullscreen"/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
