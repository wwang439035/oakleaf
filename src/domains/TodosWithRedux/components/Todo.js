import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteTodoThunk } from '../thunks/todoThunks'

const Todo = ({ id, onClick, completed, text, dispatch }) => (
  <div>
    <li
      onClick={onClick}
      style={{
        textDecoration: completed ? 'line-through' : 'none'
      }}
    >
      <span>{text}  (<a href='/#' onClick={ () => dispatch(deleteTodoThunk(id)) }>Delete</a>)</span>
    </li>
  </div>
);


Todo.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  dispatch: PropTypes.func
};

export default connect()(Todo)


