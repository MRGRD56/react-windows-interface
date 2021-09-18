import React, {FC} from "react";
import "./App.css";
import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";

const App: FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/">
                    <div>

                    </div>
                </Route>
            </Switch>
        </BrowserRouter>
    )
};

export default App;
