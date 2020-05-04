import _ from 'lodash';

const initialState = [];

const todos = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case 'DELETE_TODO':
      return [
        ..._.reject(state, todo => todo.id === action.id),
      ];
    case 'UPDATE_TODO':
      const todoId = action.id;
      const todoIndex = _.findIndex(state, todo => todo.id === todoId);
      return [
        ...state.slice(0, todoIndex),
        {
          id: action.id,
          text: action.text,
          completed: false
        },
        ...state.slice(todoIndex + 1)
      ];
    case 'RESET':
      return [
        ...initialState.todoList
      ];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        (todo.id === action.id)
          ? {...todo, completed: !todo.completed}
          : todo
      );
    default:
      return state
  }
};

export default todos
