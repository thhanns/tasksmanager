const statConfig = [
  { key: 'total', label: 'Total Tasks', color: 'bg-gray-100 text-gray-600', iconColor: 'text-gray-500' },
  { key: 'todo', label: 'To Do', color: 'bg-amber-50 text-amber-700', iconColor: 'text-amber-500' },
  { key: 'in-progress', label: 'In Progress', color: 'bg-blue-50 text-blue-700', iconColor: 'text-blue-500' },
  { key: 'done', label: 'Done', color: 'bg-green-50 text-green-700', iconColor: 'text-green-500' },
];

const icons = {
  total: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  todo: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  'in-progress': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  done: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export default function StatsCards({ stats }) {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statConfig.map(({ key, label, color, iconColor }) => (
        <div key={key} className={`card p-4 ${color}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-80">{label}</p>
              <p className="text-2xl font-bold mt-1">{stats[key] || 0}</p>
            </div>
            <div className={iconColor}>{icons[key]}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
