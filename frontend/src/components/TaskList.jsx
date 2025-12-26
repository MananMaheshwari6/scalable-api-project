import './TaskList.css'

function TaskList({ tasks, onEdit, onDelete, loading = false }) {
  if (loading) {
    return (
      <div className="task-list-loading">
        <p>Loading tasks...</p>
      </div>
    )
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p>No tasks found. Create your first task above!</p>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div key={task._id} className={`task-card ${task.completed ? 'completed' : ''}`}>
          <div className="task-content">
            <div className="task-header">
              <h3 className="task-title">{task.title}</h3>
              {task.completed && (
                <span className="task-badge">Completed</span>
              )}
            </div>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
            <div className="task-meta">
              <span className="task-date">
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="task-actions">
            <button
              onClick={() => onEdit(task)}
              className="btn btn-edit"
              title="Edit task"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="btn btn-delete"
              title="Delete task"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TaskList

