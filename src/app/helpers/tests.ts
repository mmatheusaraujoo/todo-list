import { Todo } from "../models/todo";

export function generateMokedTodo(
  todo: Partial<Todo> = {
    nome: "Tarefa teste",
    descricao:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit.",
    realizado: false,
    prioridade: 3,
  },
): Todo {
  return todo as Todo;
}
