import React, {Component} from "react"
import {connect} from "react-redux";
import {TodoList} from "./TodoList"
import * as actions from "../actions";
import {withRouter} from "react-router"
import {getVisibleTodos, getErrorMessage, getIsFetching} from "../reducers"
import FetchErrors from "./FetchErrors"

class VisibleTodoList extends Component {
    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevProps) {
        if (this.props.filter !== prevProps.filter) {
            this.fetchData()
        }
    }

    fetchData() {
        const {filter, fetchTodos} = this.props;
        fetchTodos(filter);
    }

    render() {
        const {toggleTodo, todos, isFetching, errorMessage} = this.props;
        if (isFetching && !todos.length) {
            return <p>Loading...</p>
        }
        if (errorMessage && !todos.length) {
            return <FetchErrors message={errorMessage} onRetry={() => this.fetchData()}/>
        }
        return <TodoList
            todos={todos}
            onTodoClick={toggleTodo}
        />
    }
}


const mapStateToProps = (state, {params}) => {
    const filter = params.filter || 'all';
    return {
        todos: getVisibleTodos(state, filter),
        errorMessage: getErrorMessage(state, filter),
        isFetching: getIsFetching(state, filter),
        filter
    }
};

VisibleTodoList = withRouter(connect(
    mapStateToProps,
    actions
)(VisibleTodoList));

export default VisibleTodoList;