import React from 'react'
import TodoList from './TodoList'
import TodoFooter from './TodoFooter'
import TodoHeader from './TodoHeader'
import TodoInput from './TodoInput'
import { useEffect } from 'react'
import { useState } from 'react'


const TodoContainer = () => {
  const [todoList, setTodoList] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    getList()
  }, [])

  const getList = () => {
    fetch('http://localhost:8080/todos')
      .then((response) => response.json())
      .then((data) => setTodoList(data))
      .catch((error) => console.log(error))
  }

  const onToggle = async (todo) => {
    console.log("체크박스 toggle!");
    console.log(`체크박스 여부 : ${todo.status}`);
    
    const data = {
      no      : todo.no,
      name    : todo.name,
      status  : todo.status ? 0 : 1,    
      regDate : todo.regDate,
      updDate : todo.updDate
    }

    const init = {
      method  : 'PUT',
      headers : {
        'Content-Type' : 'application/json'
      },
      body    : JSON.stringify(data)
    }
    const url = 'http://localhost:8080/todos'
    
    try {
      const response = await fetch(url, init)
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    getList()
    }

  const onRemove = async (no) => {
    console.log('할일 삭제 클릭');
    const init = {
      method  : 'DELETE',
      headers : {
        'Content-Type' : 'application/json'
      }
    }
    const url = `http://localhost:8080/todos/${no}`
    try {
      const response = await fetch(url, init)
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    getList()
    }

  const onSubmit = async(e) => {
    e.preventDefault()

    const data = {
      name: input,
      status: 0
    }
    const init = {
      method   : 'POST',
      headers  : {
        'Content-Type' : 'application/json'
      },
      body     : JSON.stringify(data)
    }
    const url = 'http://localhost:8080/todos'
    try {
      const response = await fetch(url, init)
      const newTodo = await response.json()
      getList()
    } catch (error) {
      console.log(error);
    }
    setInput('')
  }

  const onChange = (e) => {
    const changedInput = e.target.value
    setInput(changedInput)
  }

  const onCompleteAll = async () => {
    console.log('전체 완료!');

    const data = {
      no : -1
    }
    const init = {
      method    : 'PUT',
      headers   : {
        'Content-Type' : 'application/json'
      },
      body      : JSON.stringify(data)
    }
    const url = 'http://localhost:8080/todos'
    try {
      const response = await fetch(url, init)
      console.log(response);
    } catch (error) {
      console.log(error);
    }

  getList()
  }

  const onRemoveAll = async (no) => {
    console.log('전체삭제!');

    const init = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const url = 'http://localhost:8080/todos/-1'
    try {
      const response = await fetch(url, init);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    getList()
  };


  return (
    <div className='container'>
      <TodoHeader/>
      <TodoInput onSubmit={onSubmit} input={input} onChange={onChange} />
      <TodoList todoList={todoList} onToggle={onToggle} onRemove={onRemove} />
      <TodoFooter onCompleteAll={onCompleteAll} onRemoveAll={onRemoveAll}/>
    </div>
  )
}

export default TodoContainer