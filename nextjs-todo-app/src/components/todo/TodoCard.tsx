'use client';

import { Todo } from '@/types/todo';
import { useTodo } from '@/contexts/TodoContext';
import { formatDate, getPriorityColor, getPriorityLabel, isOverdue, isDueToday } from '@/lib/utils';

interface TodoCardProps {
  todo: Todo;
}

export default function TodoCard({ todo }: TodoCardProps) {
  const { toggleTodo, deleteTodo } = useTodo();

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  const handleDelete = () => {
    if (window.confirm('このTODOを削除しますか？')) {
      deleteTodo(todo.id);
    }
  };

  const priorityClass = getPriorityColor(todo.priority);
  const isTaskOverdue = isOverdue(todo);
  const isTaskDueToday = isDueToday(todo);

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-4 ${todo.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          
          <div className="flex-1">
            <h3 className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {todo.title}
            </h3>
            
            {todo.description && (
              <p className={`mt-1 text-sm ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                {todo.description}
              </p>
            )}
            
            <div className="mt-2 flex items-center space-x-4 text-sm">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityClass}`}>
                優先度: {getPriorityLabel(todo.priority)}
              </span>
              
              {todo.dueDate && (
                <span className={`text-xs ${
                  isTaskOverdue ? 'text-red-600 font-medium' : 
                  isTaskDueToday ? 'text-yellow-600 font-medium' : 
                  'text-gray-500'
                }`}>
                  期限: {formatDate(todo.dueDate)}
                  {isTaskOverdue && ' (期限切れ)'}
                  {isTaskDueToday && ' (今日期限)'}
                </span>
              )}
              
              <span className="text-xs text-gray-400">
                作成: {formatDate(todo.createdAt)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
}