import { useState, useEffect, useCallback } from 'react';
import { taskService } from '../services';
import toast from 'react-hot-toast';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });
  const [filters, setFilters] = useState({ status: '', search: '', page: 1 });
  const [stats, setStats] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.search) params.search = filters.search;
      params.page = filters.page;
      params.limit = 10;

      const res = await taskService.getTasks(params);
      setTasks(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await taskService.getStats();
      setStats(res.data.data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const createTask = async (data) => {
    const res = await taskService.createTask(data);
    toast.success('Task created');
    fetchTasks();
    fetchStats();
    return res.data.data;
  };

  const updateTask = async (id, data) => {
    const res = await taskService.updateTask(id, data);
    toast.success('Task updated');
    fetchTasks();
    fetchStats();
    return res.data.data;
  };

  const deleteTask = async (id) => {
    await taskService.deleteTask(id);
    toast.success('Task deleted');
    fetchTasks();
    fetchStats();
  };

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: newFilters.page || 1 }));
  };

  const setPage = (page) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  return {
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
    refetch: fetchTasks,
  };
}
