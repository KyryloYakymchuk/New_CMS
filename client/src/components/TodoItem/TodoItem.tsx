import { FC } from "react";
import { ITodo } from "@interfaces/types";

interface TodoProps {
  todo: ITodo;
}

const TodoItem: FC<TodoProps> = ({ todo }) => {
  return (
    <li>
      task # {todo.id} - {todo.title}, status{" "}
      <input type="checkbox" checked={todo.compleeted} />
      {todo.compleeted ? "compleet" : "not compleete"}
    </li>
  );
};
export default TodoItem;
