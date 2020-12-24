import './App.css';
import React, { useState, useEffect } from 'react';

import Form from './components/From';
import TodoList from './components/TodoList';

function App() {

  const [todos, setTodos] = useState([]); 
  const [status, setStatus] = useState("All");
  const [filteredTodos, setFilteredTodos] = useState([]);

  const filterHandler = () => {
    switch(status) {
      case "completed":
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      
      case "uncompleted":
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;

      default: 
        setFilteredTodos(todos);
        break;
    }
  };

  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  };

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [status, todos]);

  const getLocalTodos = () => {
    if(localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } 
    else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>To-do List</h1>
      </header>
      <Form 
        todos={ todos } 
        setTodos={ setTodos } 
        setStatus={ setStatus } 
      />
      <TodoList 
        todos={ todos } 
        setTodos={ setTodos } 
        filteredTodos={ filteredTodos }
      />
    </div>
  );
}

export default App;
