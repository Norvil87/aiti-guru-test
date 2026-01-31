import TodoInput from './components/TodoInput/TodoInput'
import StoreProvider from './components/StoreProvider'
import TodoList from './components/TodoList/TodoList'

import './App.css'

const App = () => {
  return (
    <StoreProvider>
      <h1>Тестовое задание chatApp</h1>
      <TodoInput />
      <TodoList />
    </StoreProvider>
  )
}

export default App
