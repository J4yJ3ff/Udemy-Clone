import { useState, useContext, useEffect } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { SyncOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Context } from '../context';
import { useRouter } from "next/router";




const ForgotPassword = () => {
    // state
    const [email, setEmail] = useState("jeffryjames07@gmail.com");
    const [success, setSuccess] = useState(false);
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // context user
    const { state: { user } } = useContext(Context);

    // router
    const router = useRouter();


    //redirect if user is logged in

    useEffect(() => {
        if (user !== null) router.push("/");
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const { data } = await axios.post("/api/forgot-password", { email });
            setSuccess(true);
            toast("Check your email from the secret code");
            setLoading(false);
        } catch (err) {
            setLoading(false);
            toast(err.response.data);
        }
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const {data} = await axios.post("/api/reset-password", {code, newPassword, email});
            setEmail("");
            setCode("");
            setNewPassword("");
            setLoading(false);
            toast("Password reset Successful. You can login with the new password.");
        } catch(err) {
            setLoading(false);
            toast(err.response.data);
        }
    }

    return (
        <>
            <h1 className='jumbotron text-center bg-primary square'>
                Forgot password
            </h1>

            <div className='container col-md-4 offset-md-4 pb-5'>
                <form onSubmit={success ? handleResetPassword : handleSubmit}>
                    <input type="email" className='form-control mb-4 p-4' placeholder="Enter Email" required value={email} onChange={(e) => setEmail(e.target.value)} />

                    {success && <>
                        <input type="text" className='form-control mb-4 p-4' placeholder="Enter Code" required value={code} onChange={(e) => setCode(e.target.value)} />

                        <input type="password" className='form-control mb-4 p-4' placeholder="Enter New Password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

                    </>}

                    <button className='btn btn-primary p-2 form-control' type='submit' disabled={loading || !email}>
                        {loading ? <SyncOutlined spin /> : "Submit"}
                    </button>
                </form>
            </div>

        </>
    )

};

export default ForgotPassword;