import {connect} from "react-redux";
import {TodoList} from "./TodoList"
import {toggleTodo} from "../actions";
import {withRouter} from "react-router"

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case "all":
            return todos;
        case "active":
            return todos.filter(t => !t.completed);
        case "completed":
            return todos.filter(t => t.completed);
    }
};

const mapStateToProps = (state, {params}) => (
    {
        todos: getVisibleTodos(
            state.todos,
            params.filter || 'all'
        )
    }
);
const mapDispatchToProps = (dispatch) => (
    {
        onTodoClick(id) {
            dispatch(toggleTodo(id))
        }
    }
);
const VisibleTodoList = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList));

export default VisibleTodoList;