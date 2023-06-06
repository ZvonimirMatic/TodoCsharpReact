import { InputGroup, Input, Button, Form, FormGroup, Label } from 'reactstrap';
import './AddTodoForm.css';
import { useRequest } from 'ahooks';
import { useState } from 'react';

export default function AddTodoForm({ onAdded }) {
    const [text, setText] = useState("");
    const [dueDate, setDueDate] = useState(null);
    const { loading: isAdding, run: addTodo } = useRequest(
        (text, dueDate) => 
            fetch(
                'api/TodoItem', 
                { 
                    method: 'POST', 
                    body: JSON.stringify({ text: text.trim(), dueDate: dueDate?.toISOString() ?? null }),
                    headers: { 'Content-Type': 'application/json' } 
                }
            ).then(response => response.json()), 
        { 
            manual: true, 
            onSuccess: () => {
                setText("");
                setDueDate(undefined);
                onAdded();
            }
        });

    function handleChangeText(e) {
        setText(e.target.value);
    }

    function handleChangeDueDate(e) {
        setDueDate(e.target.valueAsDate);
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        addTodo(text, dueDate);
    }

    const dueDateString = dueDate?.toISOString().split('T')[0] ?? '';

    return (
        <Form onSubmit={handleSubmit}>
            <InputGroup>
                <FormGroup floating className='no-margin-bottom'>
                    <Input id='todoText' value={text} onChange={handleChangeText} readOnly={isAdding} />
                    
                    <Label for="todoText">Text</Label>
                </FormGroup>

                <FormGroup floating className='no-margin-bottom'>
                    <Input id='todoDueDate' type='date' value={dueDateString} onChange={handleChangeDueDate} readOnly={isAdding}/>
                    
                    <Label for="todoDueDate">Due date</Label>
                </FormGroup>

                <Button type='submit' disabled={text.trim() === "" || isAdding}>Add todo</Button>
            </InputGroup>
        </Form>
    );
}