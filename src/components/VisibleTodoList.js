import {connect} from "react-redux";
import {TodoList} from "./TodoList"
import {toggleTodo} from "../actions";

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

const mapStateToProps = (state, ownProps) => (
    {
        todos: getVisibleTodos(
            state.todos,
            ownProps.filter
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
const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);

export default VisibleTodoList;