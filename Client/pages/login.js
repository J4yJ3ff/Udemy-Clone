import { useState, useContext, useEffect } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {SyncOutlined} from '@ant-design/icons';
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from 'next/router';

const Login = () => {

    const [email, setEmail] = useState('Jeffryjames07@gmail.com');
    const [password, setPassword] = useState('123456');
    const [loading, setLoading] = useState(false);

    // state

    const {state, dispatch} = useContext(Context);
    const { user } = state;


   //router
   const router = useRouter();

   useEffect(() => {
    if (user !== null){
        router.push("/user");
    }
   }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const { data } = await axios.post(`/api/login`, { email, password })
            // console.log("LOGIN RESPONSE", data);
            dispatch({
                type: "LOGIN",
                payload: data
            });

            //save in local Storage
            window.localStorage.setItem("user", JSON.stringify(data));

            //redirect
            // router.push("/user");

            // setLoading(false);
        } catch (err) {
           toast.error(err.response.data);
           setLoading(false);
        };

    };

    return (
        <>
            <h1 className="jumbotron text-center square">Login</h1>

            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>                  
                    <input type="email" placeholder="Enter Email" required className="form-control mb-4 p-4" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="Enter Password" required className="form-control mb-4 p-4" value={password} onChange={e => setPassword(e.target.value)} />
                    <button disabled={!email || !password || loading} type="submit" className="form-control btn btn-lg btn-primary">
                        {loading ? < SyncOutlined spin/> : "Login"}
                    </button> 

                </form>
                <p className="text-center pt-3">Not Registered? <Link href="/register"> Register </Link></p>
                <p className="text-center"><Link className="text-danger" href="/forgot-password"> Forgot Password </Link></p>
                
            </div>

        </>
    )
}

export default Login;



