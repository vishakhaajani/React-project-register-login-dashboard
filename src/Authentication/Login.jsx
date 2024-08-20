import React, { useState } from 'react'
import './register.css'
import axios from 'axios';
import { MdOutlineEmail } from "react-icons/md"; // email  icon
import { FaEyeSlash } from "react-icons/fa"; // hide password icon
import { IoEyeSharp } from "react-icons/io5"; // show password icon
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState("")
    const navigate = useNavigate("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Must fill...");
            return false;
        }

        try {
            const response = await axios.get("http://localhost:3000/employeeList");
            const all = response.data;
            const user = all.find(user => user.email === email && user.password === password);
            if (user) {
                toast.success('Login Sucessfully...', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate('/home')
            }
            else {
                toast.error('Invalid Email Or Password...', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }

            setEmail("");
            setPassword("")

        }
        catch (err) {
            console.log(err);
            return false;
        }

    }

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className='register login'>
            <div className="container">
                <div className="col-lg-4 bg-light p-5 register-form">
                    <form onSubmit={handleSubmit}>
                        <h4 className='text-center mb-5'>Login</h4>
                        <div className="mb-3 d-flex align-items-center">
                            <span><MdOutlineEmail /></span>
                            <input type="email" className="form-control" placeholder='Email...' onChange={(e) => setEmail(e.target.value)} value={email || ""} />
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <span onClick={togglePasswordVisibility}>{showPassword ? <IoEyeSharp /> : <FaEyeSlash />}</span>
                            <input type={showPassword ? "text" : "password"} className="form-control" placeholder='Password...' onChange={(e) => setPassword(e.target.value)} value={password || ""} />
                        </div>
                        <div className="mb-2 form-check d-flex align-items-center">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" /><label>Subscribe to newsletter</label>
                        </div>
                        <div className="mb-3 login-btn d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary rounded-pill mt-4 w-100">Login Now</button>
                        </div>
                        <div className="mb-3 login-btn d-flex justify-content-center">
                            <span>Don't have an account? <Link className='linkLogin' to={'/'}>Signup now</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login