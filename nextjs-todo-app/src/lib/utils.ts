import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from 'uuid';
import { Todo } from '@/types/todo';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return uuidv4();
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function isOverdue(todo: Todo): boolean {
  if (!todo.dueDate || todo.completed) return false;
  return new Date() > todo.dueDate;
}

export function isDueToday(todo: Todo): boolean {
  if (!todo.dueDate) return false;
  const today = new Date();
  const dueDate = todo.dueDate;
  return (
    today.getFullYear() === dueDate.getFullYear() &&
    today.getMonth() === dueDate.getMonth() &&
    today.getDate() === dueDate.getDate()
  );
}

export function getPriorityColor(priority: Todo['priority']): string {
  switch (priority) {
    case 'high':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'medium':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'low':
      return 'text-green-600 bg-green-50 border-green-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
}

export function getPriorityLabel(priority: Todo['priority']): string {
  switch (priority) {
    case 'high':
      return '高';
    case 'medium':
      return '中';
    case 'low':
      return '低';
    default:
      return '不明';
  }
}

export function sortTodos(todos: Todo[], sortBy: 'createdAt' | 'dueDate' | 'priority'): Todo[] {
  return [...todos].sort((a, b) => {
    switch (sortBy) {
      case 'createdAt':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'dueDate':
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.getTime() - b.dueDate.getTime();
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      default:
        return 0;
    }
  });
}

export function filterTodos(todos: Todo[], filter: 'all' | 'active' | 'completed'): Todo[] {
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    case 'all':
    default:
      return todos;
  }
}

export function getCompletionRate(todos: Todo[]): number {
  if (todos.length === 0) return 0;
  const completedCount = todos.filter(todo => todo.completed).length;
  return Math.round((completedCount / todos.length) * 100);
}

export function getTodoStats(todos: Todo[]) {
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const active = total - completed;
  const overdue = todos.filter(todo => isOverdue(todo)).length;
  const dueToday = todos.filter(todo => isDueToday(todo)).length;
  const completionRate = getCompletionRate(todos);

  const priorityStats = {
    high: todos.filter(todo => todo.priority === 'high').length,
    medium: todos.filter(todo => todo.priority === 'medium').length,
    low: todos.filter(todo => todo.priority === 'low').length,
  };

  return {
    total,
    completed,
    active,
    overdue,
    dueToday,
    completionRate,
    priorityStats,
  };
}