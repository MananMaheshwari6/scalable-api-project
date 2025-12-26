import { Link, useNavigate } from 'react-router-dom'
import './Layout.css'

function Layout({ children }) {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/dashboard" className="nav-brand">
            Todo App
          </Link>
          <div className="nav-links">
            {token ? (
              <>
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="nav-link logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <main className="container">
        {children}
      </main>
    </div>
  )
}

export default Layout

