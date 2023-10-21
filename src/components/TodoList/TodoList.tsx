import { useContext } from 'react';
import { TodoItem } from '../TodoItem';
import { TodoContext } from '../TodoContext';
import { StateFilter } from '../../types/StateFilter';

export const TodoList = () => {
  const { todos, selectedState } = useContext(TodoContext);

  const filterTodos = () => {
    switch (selectedState) {
      case StateFilter.Active:
        return todos.filter((todo) => !todo.completed);
      case StateFilter.Completed:
        return todos.filter((todo) => todo.completed);
      case StateFilter.All:
      default:
        return todos;
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filterTodos().map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}

      {/* This todo is being edited */}
      <div data-cy="Todo" className="todo">
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
          />
        </label>

        {/* This form is shown instead of the title and remove button */}
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value="Todo is being edited now"
          />
        </form>

        <div data-cy="TodoLoader" className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>

      {/* This todo is in loadind state */}
      <div data-cy="Todo" className="todo">
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          Todo is being saved now
        </span>

        <button type="button" className="todo__remove" data-cy="TodoDelete">
          ×
        </button>

        {/* 'is-active' class puts this modal on top of the todo */}
        <div data-cy="TodoLoader" className="modal overlay is-active">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    </section>
  );
};