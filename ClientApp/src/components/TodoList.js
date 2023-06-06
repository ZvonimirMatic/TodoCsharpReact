import { ListGroup, ListGroupItem, FormGroup, Input, Label, Spinner } from "reactstrap";
import TodoItem from "./TodoItem";
import './TodoList.css';
import { useToggle } from "ahooks";

export default function TodoList({ todos, loading, refresh }) {
    const [showCompleted, { toggle: toggleShowCompleted }] = useToggle(false);

    let displayedTodos = todos ?? [];
    if (!showCompleted) {
        displayedTodos = displayedTodos.filter(x => !x.isCompleted);
    }

    return (
        <div>
            <div className="list-header">
                <FormGroup check>
                    <Input type="checkbox" checked={showCompleted} onChange={toggleShowCompleted} />

                    <Label check>Show completed</Label>
                </FormGroup>

                {loading && <Spinner size="sm" />}
            </div>

            <ListGroup>
                {displayedTodos.map(todo => (
                    <ListGroupItem key={todo.id}>
                        <TodoItem todo={todo} onUpdated={refresh} onDeleted={refresh} onToggled={refresh} />
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    );
}