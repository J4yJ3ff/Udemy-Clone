import Link from 'next/link';

const UserNav = () => {
    return (
        <div className='nav flex-column nav-pills mt-2'>
            <Link className='nav-link active' href="/user">Dashboard</Link>
            <Link className='nav-link active' href="/">Home</Link>
        </div>
    )
}


export default UserNav;