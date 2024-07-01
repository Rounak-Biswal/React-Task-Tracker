import { useState } from "react"
import { v4 as uuidv4 } from 'uuid'

export default function TodoList(){
    let [todos,setTodos] = useState([{task: "Wakeup early", id: uuidv4(), isDone: false},{task: "Eat breakfast", id: uuidv4(), isDone: false},{task: "Exercise", id: uuidv4(), isDone: false}]);
    let [newTodo, setNewTodo] = useState("");
     
    let addTask = () => {
        if(newTodo !== ""){
            setTodos((prevTodo) => {
                return [...prevTodo,{task: newTodo, id: uuidv4(), isDone: false}];
            });
        }
        setNewTodo("");
    }
    let updateTodoValue = (event) => {
        setNewTodo(event.target.value);
    }
    let dltTask = (id) => {
        setTodos(todos.filter((todo) => todo.id != id));
    }
    let markAsDone = (id) => {
        setTodos((todos) =>
            todos.map((todo) => {
                if(todo.id === id){
                    return {
                        ...todo,
                        isDone: !todo.isDone,
                    };
                }
                else{
                    return todo;
                }
            })
        )
    }
    let markAllAsDone = () => {
        setTodos((todos) => 
            todos.map((todo) => {
                return {
                    ...todo,
                    isDone : true,
                }
            })
        )
    }

    return(
        <div className="container">
            <div className="sub-container-1">
                <input  type="text" 
                        className="input-box"
                        placeholder="Enter a task"  
                        value={newTodo} 
                        onChange={updateTodoValue}/>
                <button className="add-btn"
                        onClick={addTask}>
                        <i class="fa-solid fa-plus"></i>
                </button>
            </div>
            <h2>Tasks List</h2>
            <hr /><br />
            <ul>
                {todos.map((x) => {
                    return <li key={x.id}>
                        <button
                            className="done-btn" 
                            onClick={() => markAsDone(x.id)}>
                            <i class={x.isDone ? "fa-regular fa-square-check" : "fa-regular fa-square" }></i> 
                        </button>
                        <span style={x.isDone ? {textDecorationLine: "line-through"} : {}}>{x.task}</span>
                            <button 
                                className="dlt-btn"
                                onClick={() => dltTask(x.id)}>
                                <i class="fa-regular fa-trash-can"></i>
                            </button>
                        </li>
                })}
            </ul>
            <button onClick={markAllAsDone}>Mark All As Done</button>
        </div>
    )
}