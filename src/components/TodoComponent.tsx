import { useState } from "react"
import { Todo } from "../types/Todo"
import { CommandStack, Exacutable } from "../lib/Command"
import { TodoCommandManager, TodoCommand } from "../lib/TodoCommand"
import { TodoCommandFactory } from "../lib/TodoCommandFactory"

const commandStack = new CommandStack();

export default function TodoComponent() {

    const [todos, setTodos] = useState<Todo[]>([])
    const [todoDescription, setTodoDescription] = useState("")
    const CHECK_ICON = <i className="fa-solid fa-circle-check"></i>
    const CIRCLE_DASHED = <i className="fa-solid fa-circle-dashed"></i>

    function addTodo() {
        if (todoDescription.length == 0) return;

        const todo = new Todo(todoDescription);

        const wayToExecute: Exacutable = TodoCommandFactory.createAdder(setTodos, todos, todo);
        const wayToUndo: Exacutable = TodoCommandFactory.createRemover(setTodos, todos, todo);

        commandStack.addAndExecute(
            new TodoCommandManager(wayToExecute, wayToUndo)
        )

        setTodoDescription("");
    }

    function removeTodo(todo: Todo) {

        const wayToExecute: Exacutable = TodoCommandFactory.createRemover(setTodos, todos, todo);
        const wayToUndo: Exacutable = TodoCommandFactory.createAdder(setTodos, todos, todo);

        commandStack.addAndExecute(
            new TodoCommandManager(wayToExecute, wayToUndo)
        )
    }

    function complete(event: any) {
        const { id, checked } = event.target;
        const todo = todos.find(t => t.getId() == id);

        const wayToExecute: Exacutable = TodoCommandFactory.createCompleterCommand(setTodos, todos, todo, checked);
        const wayToUndo: Exacutable = TodoCommandFactory.createCompleterCommand(setTodos, todos, todo, !checked);
        commandStack.addAndExecute(
            new TodoCommandManager(wayToExecute, wayToUndo)
        )
    }

    function undoLastCommand() {
        commandStack.undo();
    }

    function todoRxjs(todo: Todo) {
        return (
            <div key={todo.getId()}>
                <div>
                    {todo.isCompleted() ? CHECK_ICON : CIRCLE_DASHED}
                    <b className="card">
                        {todo.getTitle()}
                    </b>
                    <button onClick={(e) => { removeTodo(todo) }} >
                        remove
                    </button>
                    <input type="checkbox" onChange={complete} checked={todo.isCompleted()} id={todo.getId()} />

                </div>
            </div>
        )
    }

    return (
        <div>

            <div className="card">
                <input type="text" value={todoDescription} onChange={(e) => { setTodoDescription(e.target.value) }} />
                <button onClick={addTodo}>Add</button>
                <button onClick={undoLastCommand}>Undo ({commandStack.getCommands().length})</button>
            </div>
            <div className="card">
                {todos.map(todoRxjs)}
            </div>
        </div>
    )
}