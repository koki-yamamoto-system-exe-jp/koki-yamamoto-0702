'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Todo, AppState, TodoAction } from '@/types/todo';
import { storage } from '@/lib/storage';
import { generateId } from '@/lib/utils';

const initialState: AppState = {
  todos: [],
  filter: 'all',
  sortBy: 'createdAt',
  isAdmin: false,
};

function todoReducer(state: AppState, action: TodoAction): AppState {
  switch (action.type) {
    case 'LOAD_TODOS':
      return {
        ...state,
        todos: action.payload,
      };

    case 'ADD_TODO':
      const newTodos = [...state.todos, action.payload];
      storage.saveTodos(newTodos);
      return {
        ...state,
        todos: newTodos,
      };

    case 'UPDATE_TODO':
      const updatedTodos = state.todos.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, ...action.payload.updates, updatedAt: new Date() }
          : todo
      );
      storage.saveTodos(updatedTodos);
      return {
        ...state,
        todos: updatedTodos,
      };

    case 'DELETE_TODO':
      const filteredTodos = state.todos.filter(todo => todo.id !== action.payload);
      storage.saveTodos(filteredTodos);
      return {
        ...state,
        todos: filteredTodos,
      };

    case 'TOGGLE_TODO':
      const toggledTodos = state.todos.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      );
      storage.saveTodos(toggledTodos);
      return {
        ...state,
        todos: toggledTodos,
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };

    case 'SET_SORT':
      return {
        ...state,
        sortBy: action.payload,
      };

    case 'SET_ADMIN_MODE':
      const settings = storage.getSettings();
      const newSettings = { ...settings, isAdmin: action.payload };
      storage.saveSettings(newSettings);
      return {
        ...state,
        isAdmin: action.payload,
      };

    case 'CLEAR_ALL_TODOS':
      storage.saveTodos([]);
      return {
        ...state,
        todos: [],
      };

    default:
      return state;
  }
}

interface TodoContextType {
  state: AppState;
  dispatch: React.Dispatch<TodoAction>;
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  setFilter: (filter: AppState['filter']) => void;
  setSortBy: (sortBy: AppState['sortBy']) => void;
  setAdminMode: (isAdmin: boolean) => void;
  clearAllTodos: () => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
  children: ReactNode;
}

export function TodoProvider({ children }: TodoProviderProps) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // 初期データの読み込み
  useEffect(() => {
    const todos = storage.getTodos();
    const settings = storage.getSettings();
    
    dispatch({ type: 'LOAD_TODOS', payload: todos });
    dispatch({ type: 'SET_ADMIN_MODE', payload: settings.isAdmin });
  }, []);

  // アクション関数
  const addTodo = (todoData: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTodo: Todo = {
      ...todoData,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    dispatch({ type: 'ADD_TODO', payload: newTodo });
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    dispatch({ type: 'UPDATE_TODO', payload: { id, updates } });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const toggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const setFilter = (filter: AppState['filter']) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const setSortBy = (sortBy: AppState['sortBy']) => {
    dispatch({ type: 'SET_SORT', payload: sortBy });
  };

  const setAdminMode = (isAdmin: boolean) => {
    dispatch({ type: 'SET_ADMIN_MODE', payload: isAdmin });
  };

  const clearAllTodos = () => {
    dispatch({ type: 'CLEAR_ALL_TODOS' });
  };

  const value: TodoContextType = {
    state,
    dispatch,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    setFilter,
    setSortBy,
    setAdminMode,
    clearAllTodos,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}