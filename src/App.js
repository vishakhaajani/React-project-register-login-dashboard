import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Register from './Authentication/Register';
import Login from './Authentication/Login'
import Home from './Authentication/Home';
import Employees from './Authentication/Employees'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Register/>} path='/' />
          <Route element={<Login/>} path='/login' />
          <Route element={<Home/>} path='/home' />
          <Route element={<Employees/>} path='/employees' />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
