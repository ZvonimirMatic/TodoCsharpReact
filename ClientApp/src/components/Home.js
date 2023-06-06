import { useRequest } from 'ahooks';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

export default function Home() {
  const { data: todos, loading: todosLoading, run: getTodos } = useRequest(() => fetch('api/TodoItem').then(response => response.json()));

  function refresh() {
    getTodos();
  }

  return (
    <>
      <AddTodoForm onAdded={refresh} />

      <TodoList todos={todos} loading={todosLoading} refresh={refresh} />
    </>
  );
}