import React, { useEffect, useState } from 'react';
import './home.css';
import { CiBank } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { AiOutlineGlobal } from "react-icons/ai";
import { GrMoney } from "react-icons/gr";
import { BiVector } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa6";
import { LuRefreshCcw } from "react-icons/lu";
import { MdOutlineWatchLater } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { FaCircle } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import { BsPersonPlusFill } from "react-icons/bs";
import { BsPersonFill } from "react-icons/bs";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {

    const [employee, setEmployee] = useState([])

    // useful states and const for pagination...
    const [currentPage , setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = employee.slice(firstIndex, lastIndex);
    const nPage = Math.ceil(employee.length / recordsPerPage);
    const numbers = [...Array(nPage + 1).keys()].slice(1);


    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/employeeList")
            const all = response.data;
            setEmployee(all)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleDelete = async (id) => {
            try{
                await axios.delete(`http://localhost:3000/employeeList/${id}`)
                alert("delete employee...");
                fetchData();
            }
            catch(err){
                console.log(err);
            }
    }

    function prePage() {
        if(currentPage !== firstIndex) {
            setCurrentPage(currentPage - 1)
        }
    }

    function nextPage() {
        if(currentPage !== lastIndex) {
            setCurrentPage(currentPage + 1)
        }
    }

    function changeCPage(id) {
        setCurrentPage(id)
    }

    return (
        <>
            <div className='row'>
                {/* sidebar start */}
                <div className="px-0 col-lg-2 col-md-3 col-sm-4 d-none d-md-flex">
                    <div className="d-sidebar">
                        <h4>creative team</h4>
                        <div className="user-profile d-flex align-items-center">
                            <div className="profile-img"></div>
                            <div className="profile-name px-3">
                                <p>chet faker</p>
                            </div>
                        </div>
                        <div className="d-items">
                            <ul>
                                <li className='d-flex align-items-center'>
                                    <i><CiBank /></i>
                                    <Link to={'/home'}><p>dashboard</p></Link>
                                </li>
                                <li className='d-flex align-items-center'>
                                    <i><BsPersonFill /></i>
                                    <Link to={'/employees'}><p>employees</p></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* dashboard start */}
                <div className="px-0 col-lg-10 col-md-9 col-sm-12">
                    <div className="d-about">
                        {/* navbar start */}
                        <nav className="navbar navbar-expand-md px-3">
                            <div className="container-fluid">
                                <a className="navbar-brand" href="#">Paper Dashboard 2 PRO</a>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon" />
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <form className="d-flex ms-auto" role="search">
                                        <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                                        <CiSearch className='serch-btn ' />
                                    </form>
                                </div>
                            </div>
                        </nav>

                        <div className="d-sales py-3">
                            <div className="col-lg-12 px-3 d-sales-title">
                                <h2>global sales by top locations</h2>
                                <p>All products that were shipped</p>
                            </div>
                            <div className="row bg-light">
                                {/* user employee table */}
                                <div className="col-lg-12 col-md-6 col-sm-12 px-3">
                                    <table className='table'>
                                        <thead className=''>
                                            <tr>
                                                <th>Id</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Email</th>
                                                <th>Password</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                            records.map((val) => {
                                                return (
                                                    <tr key={val.id}>
                                                        <td>{val.id}</td>
                                                        <td>{val.firstName}</td>
                                                        <td>{val.lastName}</td>
                                                        <td>{val.email}</td>
                                                        <td>{val.password}</td>
                                                        <td><button className='btn-sm btn btn-danger' onClick={() => handleDelete(val.id)}>Delete</button></td>
                                                    </tr>
                                                )
                                            })
                                            }
                                        </tbody>
                                    </table>
                                    <nav>
                                        <ul className='pagination'>
                                            <li className='page-item'>
                                                <Link to={'#'} className='page-link' onClick={prePage}>Prev</Link>
                                            </li>
                                            {
                                                numbers.map((n, i) => {
                                                    return (
                                                        <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                                        <Link to={'#'} className='page-link' onClick={() => changeCPage(n)} >{n}</Link>
                                                    </li>
                                                    )
                                                })
                                            }
                                            <li className='page-item'>
                                                <Link to={'#'} className='page-link' onClick={nextPage}>Next</Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
