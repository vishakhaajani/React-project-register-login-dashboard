import React, { useState } from 'react'
import './register.css'
import axios from 'axios';
import { FaRegUser } from "react-icons/fa"; //first name icon
import { FaRegUserCircle } from "react-icons/fa"; // last name icon
import { MdOutlineEmail } from "react-icons/md"; // email  icon
import { FaEyeSlash } from "react-icons/fa"; // hide password icon
import { IoEyeSharp } from "react-icons/io5"; // show password icon
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState("")
    const [record, setRecord] = useState("")
    const navigate = useNavigate("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !password) {
            toast.error('Must Fill...', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return false;
        }

        let obj = {
            id: Math.floor(Math.random() * 10000),
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }

        try {
            const response = await axios.post("http://localhost:3000/employeeList", obj);
            const all = [...record, response.data];
            setRecord(all);
            toast.success('Record Sucessfully Added...', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("")
            navigate('/login')
        }
        catch (err) {
            console.log(err);
            return false;
        }
        console.log(firstName);
        console.log(lastName);
        console.log(email);
        console.log(password);
    }

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className='register'>
            <div className="container">
                <div className="col-lg-4 bg-light p-5 register-form">
                    <form onSubmit={handleSubmit}>
                        <h4 className='text-center mb-5'>Register</h4>
                        <div className="mb-3 d-flex align-items-center">
                            <span><FaRegUser /></span>
                            <input type="text" className="form-control f-name" placeholder='First Name...' onChange={(e) => setFirstName(e.target.value)} value={firstName || ""} />
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <span><FaRegUserCircle /></span>
                            <input type="text" className="form-control" placeholder='Last Name...' onChange={(e) => setLastName(e.target.value)} value={lastName || ""} />
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <span><MdOutlineEmail /></span>
                            <input type="email" className="form-control" placeholder='Email...' onChange={(e) => setEmail(e.target.value)} value={email || ""} />
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <span onClick={togglePasswordVisibility}>{showPassword ? <IoEyeSharp /> : <FaEyeSlash />}</span>
                            <input type={showPassword ? "text" : "password"} className="form-control" placeholder='Password...' onChange={(e) => setPassword(e.target.value)} value={password || ""} />
                        </div>
                        <div className=" form-check d-flex align-items-center">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" /><label>I agree to the terms and conditions.</label>
                        </div>
                        <div className="mb-2 register-btn d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary rounded-pill mt-4 w-100">Register Now</button>
                        </div>
                        <div className="mb-3 login-btn d-flex justify-content-center">
                            <span>Already have an account? <Link className='linkRegister' to={'/login'}>Login now</Link></span>
                        </div>
                    </form>
                </div>
            </div>h
        </div>
    )
}

export default Register