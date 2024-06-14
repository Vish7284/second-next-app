import { useState, useEffect } from "react";

const TodoList = ({ todos }) => {
  const [localTodos, setLocalTodos] = useState(todos || []);

  useEffect(() => {
    setLocalTodos(todos);
  }, [todos]);

  const deleteTodoHandler = async (id) => {
    try {
      const response = await fetch(`/api/deleteTodo?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }
      setLocalTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleCompletionHandler = async (id) => {
    try {
      const response = await fetch(`/api/toggleTodo?id=${id}`, {
        method: "PATCH",
      });
      if (!response.ok) {
        throw new Error("Failed to toggle todo completion");
      }
      setLocalTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-center text-white font-bold">Todo List</h2>
      <ul className="list-none p-0">
        {localTodos && localTodos.length > 0 ? (
          localTodos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-white text-black rounded-lg p-4 mb-2 shadow-lg"
            >
              <input
                type="checkbox"
                onClick={() => toggleCompletionHandler(todo.id)}
                checked={todo.completed || false}
              />
              {todo.text}
              <button
                className="bg-fuchsia-300 rounded-lg p-4"
                onClick={() => deleteTodoHandler(todo.id)}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <li className="text-white text-center">No todos available</li>
        )}
      </ul>
    </div>
  );
};

export async function getServerSideProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://vp7524019445:nItWKLdqsXiLb19M@cluster0.n1rnof8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  const todoListItem = db.collection("to-dos");

  const todos = await todoListItem.find({}).toArray();
  client.close();

  return {
    props: {
      todos: todos.map((todo) => ({
        id: todo._id.toString(),
        text: todo.text,
        completed: todo.completed || false,
      })),
    },
  };
}

export default TodoList;
