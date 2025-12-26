import { useState, useEffect } from 'react'
import './TaskForm.css'

function TaskForm({ task = null, onSubmit, onCancel, loading = false }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false
  })
  const [error, setError] = useState('')

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        completed: task.completed || false
      })
    } else {
      setFormData({
        title: '',
        description: '',
        completed: false
      })
    }
    setError('')
  }, [task])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!formData.title.trim()) {
      setError('Title is required')
      return
    }

    onSubmit({
      title: formData.title.trim(),
      description: formData.description.trim(),
      completed: formData.completed
    })
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      {error && (
        <div className="message message-error">
          {error}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter task title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          placeholder="Enter task description (optional)"
        />
      </div>

      {task && (
        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="completed"
              checked={formData.completed}
              onChange={handleChange}
            />
            <span>Mark as completed</span>
          </label>
        </div>
      )}

      <div className="form-actions">
        {task && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  )
}

export default TaskForm

