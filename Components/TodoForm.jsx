import { useState } from "react";
import TodoList from "./TodoList";

const TodoForm = () => {
  const [adding, setAdding] = useState(false);
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const todoChangehandler = (e) => {
    setTodo(e.target.value);
  };

  const statusChangeHandler = () => {
    setAdding((prev) => !prev);
  };

  const todoFormHandler = async (e) => {
    e.preventDefault();
    const todoData = {
      id: Date.now(),
      text: todo,
      completed: false,
    };

    try {
      const response = await fetch("/api/addingTodo", {
        method: "POST",
        body: JSON.stringify(todoData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      const data = await response.json();
      setTodos((prevTodos) => [...prevTodos, data]);
      setTodo("");
      setAdding(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-600 h-screen p-4">
      {adding ? (
        <>
          <h1 className="text-center text-white font-bold">Add Todo</h1>
          <div className="flex justify-center">
            <form
              onSubmit={todoFormHandler}
              className="p-10 bg-cyan-300 h-48 w-80 flex justify-center items-center rounded-lg"
            >
              <div>
                <input
                  type="text"
                  value={todo}
                  onChange={todoChangehandler}
                  placeholder="Enter Todo"
                  className="p-4 rounded-lg"
                />
              </div>
              <button className="bg-rose-300 hover:bg-rose-600 rounded-lg ml-3 p-4">
                Add Todo
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center">
          <button
            onClick={statusChangeHandler}
            className="bg-fuchsia-400 hover:bg-fuchsia-700 rounded-lg p-8 text-white"
          >
            Add TODO'S
          </button>
        </div>
      )}
      <TodoList todos={todos} />
    </div>
  );
};

export default TodoForm;
