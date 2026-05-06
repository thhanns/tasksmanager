import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import StatsCards from '../components/StatsCards';
import TaskFilters from '../components/TaskFilters';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import { useTasks } from '../hooks/useTasks';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchParams] = useSearchParams();

  const {
    tasks,
    loading,
    error,
    pagination,
    filters,
    stats,
    createTask,
    updateTask,
    deleteTask,
    updateFilters,
    setPage,
  } = useTasks();

  const handleCreate = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id);
    }
  };

  const handleSubmit = async (data) => {
    if (editingTask) {
      await updateTask(editingTask._id, data);
    } else {
      await createTask(data);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 animate-fade-in">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 animate-fade-in-down">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg lg:hidden transition-all duration-200 active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500">Manage your tasks efficiently</p>
              </div>
            </div>
            <button onClick={handleCreate} className="btn-primary flex items-center gap-2 shadow-lg shadow-indigo-200 hover:shadow-indigo-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">New Task</span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {loading ? (
            <LoadingSpinner variant="skeleton" />
          ) : error ? (
            <div className="card p-8 text-center animate-scale-in">
              <p className="text-red-500 mb-4">{error}</p>
              <button onClick={() => window.location.reload()} className="btn-secondary">
                Try Again
              </button>
            </div>
          ) : (
            <>
              <StatsCards stats={stats} />

              <div className="card p-4 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
                <TaskFilters filters={filters} onFilterChange={updateFilters} />
              </div>

              {tasks.length === 0 ? (
                <div className="card p-12 text-center animate-scale-in">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-bounce-gentle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">No tasks found</h3>
                  <p className="text-gray-500 mb-4">
                    {filters.search || filters.status
                      ? 'Try adjusting your filters'
                      : 'Create your first task to get started'}
                  </p>
                  {!filters.search && !filters.status && (
                    <button onClick={handleCreate} className="btn-primary">
                      Create Task
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {tasks.map((task, i) => (
                    <TaskCard key={task._id} task={task} index={i} onEdit={handleEdit} onDelete={handleDelete} />
                  ))}
                  <Pagination pagination={pagination} onPageChange={setPage} />
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}
