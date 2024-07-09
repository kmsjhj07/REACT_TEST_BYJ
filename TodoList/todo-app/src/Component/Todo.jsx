import React from "react";

const Todo = ({todo, onDelete }) => {
    return (
        <div className='card'>
            <h1>{todo.name}</h1>
            <button onClick={() => onDelete(todo.no)}>삭제</button>
        </div>
    )
}

export default Todo