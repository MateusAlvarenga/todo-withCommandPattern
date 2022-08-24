import { Exacutable, Command, CommandStack } from "./Command";
import { Todo } from "../types/Todo";

export class TodoCommandManager implements Command {
  private wayTOExecute: Exacutable;
  private wayTOUndo: Exacutable;

  constructor(aWayTOExecute: Exacutable, aWayTOUndo: Exacutable) {
    this.wayTOExecute = aWayTOExecute;
    this.wayTOUndo = aWayTOUndo;
  }

  execute(): void {
    this.wayTOExecute.execute();
  }
  undo(): void {
    this.wayTOUndo.execute();
  }
}

export class TodoCommand implements Exacutable {
  private setter: Function;
  private todoNewState: any;

  constructor(aSetter: Function, aTodo: any) {
    this.setter = aSetter;
    this.todoNewState = aTodo;
  }

  execute(): void {
    this.setter(this.todoNewState);
  }
}

export class CompleterCommand implements Exacutable {
  private setter: Function;
  private newState: boolean;
  private todos: Todo[];
  private todo: Todo;

  constructor(aSetter: Function, todos: Todo[], todo: Todo, newState: boolean) {
    this.setter = aSetter;
    this.newState = newState;
    this.todos = todos;
    this.todo = todo;
  }
  execute(): void {
    const newTodos = this.todos.map((t) => {
      if (t.getId() == this.todo.getId()) {
        t.setCompleted(this.newState);
      }
      return t;
    });
    this.setter(newTodos);
  }
}
