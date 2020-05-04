import {
  addTodo,
  deleteTodo
} from '../actions/todos'

export const addTodoThunk = text => (dispatch, getState) => {
  dispatch(addTodo(text));
};

export const deleteTodoThunk = id => (dispatch) => {
  dispatch(deleteTodo(id));
};