import { Button, Input, InputGroup, Form } from 'reactstrap';
import './TodoItem.css';
import { useState } from 'react';
import { useRequest } from 'ahooks';

export default function TodoItem({ todo, onUpdated, onDeleted, onToggled }) {
    const [text, setText] = useState(todo.text);
    const [dueDate, setDueDate] = useState(todo.dueDate ? new Date(todo.dueDate) : null);
    const { loading: isUpdating, run: updateTodo } = useRequest(
        (id, text, dueDate) => 
            fetch(
                'api/TodoItem/' + id.toString(), 
                { 
                    method: 'PUT', 
                    body: JSON.stringify({ text: text.trim(), dueDate: dueDate?.toISOString() ?? null }), 
                    headers: { 'Content-Type': 'application/json' } 
                }
            ).then(response => response.json()), 
        { 
            manual: true, 
            onSuccess: () => {
                onUpdated();
            },
        });
    const { loading: isDeleting, run: deleteTodo } = useRequest(
        (id) => 
            fetch(
                'api/TodoItem/' + id.toString(), 
                { 
                    method: 'DELETE' 
                }
            ), 
        { 
            manual: true, 
            onSuccess: () => {
                onDeleted();
            },
        });
    const { loading: isToggling, run: toggleTodo } = useRequest(
        (id) => 
            fetch(
                'api/TodoItem/' + id.toString() + '/ToggleIsCompleted', 
                { 
                    method: 'PUT' 
                }
            ).then(response => response.json()), 
        { 
            manual: true, 
            onSuccess: () => {
                onToggled();
            },
        });

    function handleChangeText(e) {
        setText(e.target.value);
    }

    function handleChangeDueDate(e) {
        setDueDate(e.target.valueAsDate);
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        updateTodo(todo.id, text, dueDate);
    }

    function handleDelete() {
        deleteTodo(todo.id);
    }

    function handleToggle() {
        toggleTodo(todo.id);
    }
    
    const dueDateString = dueDate?.toISOString().split('T')[0] ?? '';

    return (
        <div className='todoItemContainer'>
            <Input type='checkbox' checked={todo.isCompleted} onChange={handleToggle} disabled={isUpdating || isDeleting || isToggling} />

            <Form onSubmit={handleSubmit} className='todoItemInfo'>
                <InputGroup>               
                    <Input value={text} onChange={handleChangeText} readOnly={isUpdating || isDeleting || isToggling} bsSize='sm' />

                    <Input type='date' value={dueDateString} onChange={handleChangeDueDate} readOnly={isUpdating || isDeleting || isToggling} bsSize='sm' />

                    <Button type='submit' size='sm' disabled={text.trim() === "" || isUpdating || isDeleting || isToggling}>Save</Button>
                </InputGroup>
            </Form>

            <Button color='danger' disabled={isUpdating || isDeleting || isToggling} size='sm' onClick={handleDelete}>Delete</Button>
        </div>
    )
}