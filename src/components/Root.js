import React from "react"
import PropTypes from "prop-types"
import {Provider} from "react-redux"
import {App} from "./App"
import {Router, Route, browserHistory} from "react-router"

const Root = ({ store }) => (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/(:filter)" component={App} />
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;