
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './Authentication/Login'
import { Signup } from './Authentication/Signup'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home } from './Home/Home';
import { Dashboard } from './Dashboard/Dashboard';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      <ToastContainer position="top-right"
        autoClose={4996}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition: Bounce />



    </div>
  )
}

export default App
