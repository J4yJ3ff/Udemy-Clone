import { useContext, useState } from 'react';
import axios from "axios";
import { Context } from "../../context";
import { Button } from "antd";
import { SettingOutlined, UserSwitchOutlined, LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import UserRoute from "../../components/routes/UserRoute"

const BecomeInstructor = () => {
    //state
    const [loading, setLoading] = useState(false);
    const {
        state: { user },
    } = useContext(Context);

    const becomeInstructor = () => {
        // console.log("Become Instructor:");
        setLoading(true);
        axios.post("/api/make-instructor").then(res => {
            console.log(res);
            window.location.href = res.data
        }).catch(err => {{
            console.log(err.response.status)
            toast("Stripe onboarding failed. Try again");
            setLoading(false);
        }}) 
    };

    return (
        <>
            <h1 className="jumbotron text-center square"> Become Instructor</h1>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 text-center'>
                        <div className='pt-4'>
                            <UserSwitchOutlined className='display-1 pb-3' />
                            <br/>

                            <h2>Setup PayOut to Publish Courses</h2>
                            <p className='lead text-warning'>Geekbits Academy partners with stripe to transfer earnings to your  bank account.</p>

                            <Button  
                            className='mb-3' 
                            type='primary' 
                            block 
                            shape='round' 
                            icon={loading ? <LoadingOutlined/> : <SettingOutlined/>} 
                            size="large" 
                            onClick={becomeInstructor} 
                            disabled={user && user.role && user.role.includes("instructor") || loading }>
                                {loading ? "Processing..." : "Payout Setup"}
                            </Button>

                            <div className='lead'>You will be redirected to Stripe to Complete onboarding Process</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BecomeInstructor;