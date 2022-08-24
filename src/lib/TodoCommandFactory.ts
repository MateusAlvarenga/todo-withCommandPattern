import { Exacutable } from "./Command";
import { TodoCommand } from "./TodoCommand";
import { CompleterCommand } from "./TodoCommand";

export class TodoCommandFactory {
  static createAdder(setTodos: any, todos: any, todo: any): Exacutable {
    return new TodoCommand(setTodos, [...new Set(todos).add(todo)]);
  }
  static createRemover(setTodos: any, todos: any, todo: any): Exacutable {
    return new TodoCommand(
      setTodos,
      todos.filter((t: any) => t !== todo)
    );
  }
  static createCompleterCommand(setTodos: any, todos: any, todo: any, newState: boolean): Exacutable {
    return new CompleterCommand(setTodos, todos,todo, newState);
  }
}
