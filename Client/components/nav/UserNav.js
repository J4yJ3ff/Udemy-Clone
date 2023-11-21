import Link from 'next/link';
import { useState, useEffect} from "react";



const UserNav = () => {

    const [current, setCurrent] = useState("");

    useEffect(() => {
        process.browser && setCurrent(window.location.pathname);
    }, [process.browser && window.location.pathname]);



    return (
        <div className='nav flex-column nav-pills'>
            <Link className={`nav-link ${current === "/user" && "active"} `} href="/user">Dashboard</Link>
            <Link className={`nav-link ${current === "/" && "active"} `} href="/">Home</Link>
        </div>
    )
}


export default UserNav;