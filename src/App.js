import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './pages/Context/AuthContext';

function App() {

  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/'></Route>
          <Route index element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
          <Route path='register' element={<Register />}></Route>
          <Route path='login' element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
