import React from 'react'
import AddTodo from './AddTodo'
import VisibleTodoList from './VisibleTodoList'
import Footer from './Footer'
import { Provider } from 'react-redux'
import store from '../../../redux/store'

const App = () => (
  <Provider store={store}>
    <div>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </div>
  </Provider>
);

export default App
