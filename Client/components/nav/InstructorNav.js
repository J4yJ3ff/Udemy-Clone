import Link from 'next/link';
import {useState, useEffect} from "react";






const InstructorNav = () => {
    const [current, setCurrent] =useState("")


    useEffect(() => {
        process.browser && setCurrent(window.location.pathname);
    }, [process.browser && window.location.pathname])

    return (
        <div className='nav flex-column nav-pills'>
            <Link className={`nav-link ${current === "/instructor" && "active"} `} href="/instructor" >Dashboard</Link>
            <Link className={`nav-link ${current === "/instructor/course/create" && "active"} `} href="/instructor/course/create">Create Course</Link>
        </div>
    )
}


export default InstructorNav;

