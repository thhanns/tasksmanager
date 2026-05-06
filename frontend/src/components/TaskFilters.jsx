import { useState, useEffect } from 'react';

export default function TaskFilters({ filters, onFilterChange }) {
  const [search, setSearch] = useState(filters.search || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== filters.search) {
        onFilterChange({ search });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const statuses = [
    { value: '', label: 'All' },
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'done', label: 'Done' },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="input-field pl-10"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {statuses.map((s) => (
          <button
            key={s.value}
            onClick={() => onFilterChange({ status: s.value, page: 1 })}
            className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              filters.status === s.value
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
