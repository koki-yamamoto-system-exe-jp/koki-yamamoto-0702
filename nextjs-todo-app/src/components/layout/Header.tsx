'use client';

import { useTodo } from '@/contexts/TodoContext';

export default function Header() {
  const { state, setAdminMode } = useTodo();

  const toggleMode = () => {
    setAdminMode(!state.isAdmin);
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              TODO App
            </h1>
            {state.isAdmin && (
              <span className="ml-3 px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                管理者モード
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleMode}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                state.isAdmin
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {state.isAdmin ? 'ユーザーモード' : '管理者モード'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}