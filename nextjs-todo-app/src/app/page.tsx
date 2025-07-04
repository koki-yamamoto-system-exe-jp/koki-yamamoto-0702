'use client';

import { useState } from 'react';
import { useTodo } from '@/contexts/TodoContext';
import { filterTodos, sortTodos } from '@/lib/utils';
import Header from '@/components/layout/Header';
import TodoCard from '@/components/todo/TodoCard';
import TodoForm from '@/components/todo/TodoForm';

export default function HomePage() {
  const { state } = useTodo();
  const [showForm, setShowForm] = useState(false);

  // フィルターとソートを適用
  const filteredAndSortedTodos = sortTodos(
    filterTodos(state.todos, state.filter),
    state.sortBy
  );

  if (state.isAdmin) {
    // 管理者モードの場合は管理者画面にリダイレクト
    return (
      <div>
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">管理者ダッシュボード</h2>
            <p className="text-gray-600">管理者機能は開発中です。</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TODO追加ボタン */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            {showForm ? 'フォームを閉じる' : '+ 新しいTODOを追加'}
          </button>
        </div>

        {/* TODO追加フォーム */}
        {showForm && (
          <div className="mb-6">
            <TodoForm onClose={() => setShowForm(false)} />
          </div>
        )}

        {/* フィルターとソート */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">フィルター:</span>
            <FilterButtons />
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">ソート:</span>
            <SortButtons />
          </div>
        </div>

        {/* TODO一覧 */}
        <div className="space-y-4">
          {filteredAndSortedTodos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {state.todos.length === 0 
                  ? 'TODOがありません。新しいTODOを追加してください。'
                  : 'フィルター条件に一致するTODOがありません。'
                }
              </p>
            </div>
          ) : (
            filteredAndSortedTodos.map(todo => (
              <TodoCard key={todo.id} todo={todo} />
            ))
          )}
        </div>

        {/* 統計情報 */}
        {state.todos.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">統計</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{state.todos.length}</div>
                <div className="text-gray-600">総TODO数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {state.todos.filter(t => t.completed).length}
                </div>
                <div className="text-gray-600">完了済み</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {state.todos.filter(t => !t.completed).length}
                </div>
                <div className="text-gray-600">進行中</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round((state.todos.filter(t => t.completed).length / state.todos.length) * 100)}%
                </div>
                <div className="text-gray-600">完了率</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterButtons() {
  const { state, setFilter } = useTodo();
  
  const filters = [
    { key: 'all', label: '全て' },
    { key: 'active', label: '進行中' },
    { key: 'completed', label: '完了済み' },
  ] as const;

  return (
    <div className="flex space-x-1">
      {filters.map(filter => (
        <button
          key={filter.key}
          onClick={() => setFilter(filter.key)}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            state.filter === filter.key
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

function SortButtons() {
  const { state, setSortBy } = useTodo();
  
  const sorts = [
    { key: 'createdAt', label: '作成日' },
    { key: 'dueDate', label: '期限日' },
    { key: 'priority', label: '優先度' },
  ] as const;

  return (
    <div className="flex space-x-1">
      {sorts.map(sort => (
        <button
          key={sort.key}
          onClick={() => setSortBy(sort.key)}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            state.sortBy === sort.key
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {sort.label}
        </button>
      ))}
    </div>
  );
}