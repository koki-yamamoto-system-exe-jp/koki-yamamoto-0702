import { Todo, AppSettings } from '@/types/todo';

const TODOS_KEY = 'todos';
const SETTINGS_KEY = 'appSettings';

export const storage = {
  // TODOの操作
  getTodos: (): Todo[] => {
    if (typeof window === 'undefined') return [];
    try {
      const todos = localStorage.getItem(TODOS_KEY);
      if (!todos) return [];
      const parsedTodos = JSON.parse(todos);
      // Date オブジェクトを復元
      return parsedTodos.map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt),
        dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
      }));
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
      return [];
    }
  },

  saveTodos: (todos: Todo[]): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
    }
  },

  // 設定の操作
  getSettings: (): AppSettings => {
    if (typeof window === 'undefined') return { isAdmin: false, theme: 'light' };
    try {
      const settings = localStorage.getItem(SETTINGS_KEY);
      if (!settings) return { isAdmin: false, theme: 'light' };
      return JSON.parse(settings);
    } catch (error) {
      console.error('Error loading settings from localStorage:', error);
      return { isAdmin: false, theme: 'light' };
    }
  },

  saveSettings: (settings: AppSettings): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings to localStorage:', error);
    }
  },

  // データのクリア
  clearAll: (): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(TODOS_KEY);
      localStorage.removeItem(SETTINGS_KEY);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },

  // データのエクスポート
  exportData: (): string => {
    const todos = storage.getTodos();
    const settings = storage.getSettings();
    return JSON.stringify({ todos, settings }, null, 2);
  },

  // データのインポート
  importData: (data: string): boolean => {
    try {
      const parsed = JSON.parse(data);
      if (parsed.todos && Array.isArray(parsed.todos)) {
        storage.saveTodos(parsed.todos);
      }
      if (parsed.settings) {
        storage.saveSettings(parsed.settings);
      }
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  },
};