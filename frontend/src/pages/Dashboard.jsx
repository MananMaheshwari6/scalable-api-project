import { useState, useEffect } from 'react'
import { tasksAPI } from '../utils/api'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import './Dashboard.css'

function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [editingTask, setEditingTask] = useState(null)
  const [formLoading, setFormLoading] = useState(false)

  const fetchTasks = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await tasksAPI.getAll()
      if (response.success) {
        setTasks(response.data || [])
      }
    } catch (err) {
      setError(err.message || 'Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleCreateTask = async (taskData) => {
    try {
      setFormLoading(true)
      setError('')
      setSuccess('')
      const response = await tasksAPI.create(taskData)
      if (response.success) {
        setSuccess('Task created successfully!')
        setTasks(prev => [response.data, ...prev])
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (err) {
      setError(err.message || 'Failed to create task')
    } finally {
      setFormLoading(false)
    }
  }

  const handleUpdateTask = async (taskData) => {
    try {
      setFormLoading(true)
      setError('')
      setSuccess('')
      const response = await tasksAPI.update(editingTask._id, taskData)
      if (response.success) {
        setSuccess('Task updated successfully!')
        setTasks(prev =>
          prev.map(task =>
            task._id === editingTask._id ? response.data : task
          )
        )
        setEditingTask(null)
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (err) {
      setError(err.message || 'Failed to update task')
    } finally {
      setFormLoading(false)
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return
    }

    try {
      setError('')
      setSuccess('')
      const response = await tasksAPI.delete(taskId)
      if (response.success) {
        setSuccess('Task deleted successfully!')
        setTasks(prev => prev.filter(task => task._id !== taskId))
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (err) {
      setError(err.message || 'Failed to delete task')
    }
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setError('')
    setSuccess('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingTask(null)
    setError('')
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="dashboard-subtitle">Manage your tasks</p>
      </div>

      {error && (
        <div className="message message-error">
          {error}
        </div>
      )}

      {success && (
        <div className="message message-success">
          {success}
        </div>
      )}

      {editingTask ? (
        <div className="dashboard-section">
          <h2>Edit Task</h2>
          <TaskForm
            task={editingTask}
            onSubmit={handleUpdateTask}
            onCancel={handleCancelEdit}
            loading={formLoading}
          />
        </div>
      ) : (
        <div className="dashboard-section">
          <h2>Create New Task</h2>
          <TaskForm
            onSubmit={handleCreateTask}
            loading={formLoading}
          />
        </div>
      )}

      <div className="dashboard-section">
        <h2>Your Tasks ({tasks.length})</h2>
        <TaskList
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          loading={loading}
        />
      </div>
    </div>
  )
}

export default Dashboard
