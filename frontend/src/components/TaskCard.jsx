import { useState } from 'react';

const statusConfig = {
  todo: { label: 'To Do', color: 'bg-amber-100 text-amber-800', dot: 'bg-amber-500' },
  'in-progress': { label: 'In Progress', color: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500 animate-pulse-dot' },
  done: { label: 'Done', color: 'bg-green-100 text-green-800', dot: 'bg-green-500' },
};

export default function TaskCard({ task, onEdit, onDelete, index = 0 }) {
  const status = statusConfig[task.status];
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await new Promise((r) => setTimeout(r, 300));
    onDelete(task._id);
  };

  return (
    <div
      className={`card p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 opacity-0 animate-fade-in-up group ${
        isDeleting ? 'animate-slide-out' : ''
      }`}
      style={{ animationDelay: `${index * 0.06}s`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className={`text-sm font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors ${task.status === 'done' ? 'line-through text-gray-500 group-hover:text-gray-500' : ''}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">{task.description}</p>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
            title="Edit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
        <time className="text-xs text-gray-400">
          {new Date(task.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </time>
      </div>
    </div>
  );
}
