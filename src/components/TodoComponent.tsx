import { useState } from "react";
import { Todo } from "../types/Todo";
import { CommandStack, Exacutable } from "../lib/Command";
import { TodoCommandManager } from "../lib/TodoCommand";
import { TodoCommandFactory } from "../lib/TodoCommandFactory";
import {
  Stack,
  Button,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  Divider
} from "@mui/material";

const commandStack = new CommandStack();

export default function TodoComponent() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoDescription, setTodoDescription] = useState("");
  const FA_CIRCLE_CHECK = <i className="fa-solid fa-circle-check"></i>;
  const FA_CIRCLE = <i className="fa-solid fa-circle-dashed"></i>;
  const FA_PLUS = <i className="fa-solid fa-plus"></i>;
  const FA_TRASH_CAN = <i className="fa-solid fa-trash-can"></i>;
  const FA_ROTATE_LEFT = <i className="fa-solid fa-rotate-left"></i>;

  function addTodo() {
    if (todoDescription.length === 0) return;

    const todo = new Todo(todoDescription);

    const wayToExecute: Exacutable = TodoCommandFactory.createAdder(
      setTodos,
      todos,
      todo
    );
    const wayToUndo: Exacutable = TodoCommandFactory.createRemover(
      setTodos,
      todos,
      todo
    );

    commandStack.addAndExecute(new TodoCommandManager(wayToExecute, wayToUndo));

    setTodoDescription("");
  }

  function removeTodo(todo: Todo) {
    const wayToExecute: Exacutable = TodoCommandFactory.createRemover(
      setTodos,
      todos,
      todo
    );
    const wayToUndo: Exacutable = TodoCommandFactory.createAdder(
      setTodos,
      todos,
      todo
    );

    commandStack.addAndExecute(new TodoCommandManager(wayToExecute, wayToUndo));
  }

  function complete(event: any) {
    const { id, checked } = event.target;
    const todo = todos.find((t) => t.getId() === id);

    const wayToExecute: Exacutable = TodoCommandFactory.createCompleterCommand(
      setTodos,
      todos,
      todo,
      checked
    );
    const wayToUndo: Exacutable = TodoCommandFactory.createCompleterCommand(
      setTodos,
      todos,
      todo,
      !checked
    );
    commandStack.addAndExecute(new TodoCommandManager(wayToExecute, wayToUndo));
  }

  function undoLastCommand() {
    commandStack.undo();
  }

  function todoRxjs(todo: Todo) {
    return (
      <Stack key={todo.getId()}>
        <Card direction="row" spacing={5} margin={2}>
          <CardContent>
            {todo.getTitle()} {todo.isCompleted() ? FA_CIRCLE_CHECK : FA_CIRCLE}
          </CardContent>
          <CardActions>
            <Button
              variant="danger"
              onClick={(e) => {
                removeTodo(todo);
              }}
            >
              {FA_TRASH_CAN}&nbsp; remove
            </Button>
            <input
              type="checkbox"
              onChange={complete}
              checked={todo.isCompleted()}
              id={todo.getId()}
            />{" "}
          </CardActions>
        </Card>
      </Stack>
    );
  }

  return (
    <Stack alignItems="center">
      <Stack direction="row" spacing={2}>
        <input
          className="ui input"
          type="text"
          value={todoDescription}
          onChange={(e) => {
            setTodoDescription(e.target.value);
          }}
        />
        <Button onClick={addTodo}>Add {FA_PLUS}</Button>
        <Button onClick={undoLastCommand}>
          Undo {FA_ROTATE_LEFT}({commandStack.getCommands().length})
        </Button>
      </Stack>
      <List className="">
        {todos.map((t) => (
          <ListItem>
            {todoRxjs(t)} <Divider />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
