export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
}

export interface AppState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  sortBy: 'createdAt' | 'dueDate' | 'priority';
  isAdmin: boolean;
}

export interface AppSettings {
  isAdmin: boolean;
  theme: 'light' | 'dark';
}

export type TodoAction =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'UPDATE_TODO'; payload: { id: string; updates: Partial<Todo> } }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'SET_FILTER'; payload: AppState['filter'] }
  | { type: 'SET_SORT'; payload: AppState['sortBy'] }
  | { type: 'SET_ADMIN_MODE'; payload: boolean }
  | { type: 'LOAD_TODOS'; payload: Todo[] }
  | { type: 'CLEAR_ALL_TODOS' };