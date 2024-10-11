import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/Context'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import PrivateRoute from './routes/PrivateRoute';
import Task from './pages/Task';
import Project from './pages/Project';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path='/project' element={<Project/>} />
            <Route path="/task" element={<Task />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ width: '50%' }}
      />
      <Footer />
    </AuthProvider>
  )
}

export default App
