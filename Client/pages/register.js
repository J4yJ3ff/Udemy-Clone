import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {SyncOutlined} from '@ant-design/icons';
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from 'next/router';

const Register = () => {
    const [name, setName] = useState('007');
    const [email, setEmail] = useState('Jeffryjames07@gmail.com');
    const [password, setPassword] = useState('123456');
    const [loading, setLoading] = useState(false)

    const {state: {user}} = useContext(Context);
    const router = useRouter();


    useEffect(() => {
        if (user !== null){
            router.push("/");
        }
       }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const { data } = await axios.post(`/api/register`, { name, email, password })
            console.log(data)
            toast.success("Registration Successful. Please Login");
            setLoading(false);
        } catch (err) {
           toast.error(err.response.data);
           setLoading(false);
        };

    };

    return (
        <>
            <h1 className="jumbotron text-center square">Register</h1>

            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Enter Name" required className="form-control mb-4 p-4" value={name} onChange={e => setName(e.target.value)} />
                    <input type="email" placeholder="Enter Email" required className="form-control mb-4 p-4" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="Enter Password" required className="form-control mb-4 p-4" value={password} onChange={e => setPassword(e.target.value)} />
                    <button disabled={!name || !email || !password || loading} type="submit" className="form-control btn btn-lg btn-primary">
                        {loading ? < SyncOutlined spin/> : "Submit"}
                    </button> 

                </form>
                <p className="text-center mt-3">Already Registered? <Link href="/login"> Login </Link></p>
                
            </div>

        </>
    )
}

export default Register;