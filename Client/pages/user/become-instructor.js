import { useContext, useState } from 'react';
import axios from "axios";
import { Context } from "../../context";
import { Button } from "antd";
import { SettingOutlined, UserSwitchOutlined, LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useRouter } from 'next/router';




const BecomeInstructor = () => {
    //state
    // const [loading, setLoading] = useState(false);
    // const {
    //     state: { user },
    // } = useContext(Context);

    // const becomeInstructor = () => {
    //     // console.log("Become Instructor:");
    //     setLoading(true);
    //     axios.post("/api/make-instructor", {user:user}).then(res => {
    //         console.log(res);
    //         window.location.href = res.data
    //     }).catch(err => {{
    //         console.log(err.response.status)
    //         toast("Stripe onboarding failed. Try again");
    //         setLoading(false);
    //     }}) 
    // };


    const [hidden, setHidden] = useState(true);
    const [bizname, setBizname] = useState("Enigma");
    const [accNumber, setAccNumber] = useState("0000000000");
    const [bank, setBank] = useState("Zenith Bank");
    const [loading, setLoading] = useState(false);

    const { state: { user } } = useContext(Context);

    const router = useRouter();

    const becomeInstructor = () => {
        setHidden(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/make-instructor", { user, bizname, accNumber, bank });

            if (response.data.paystack_account_id) {
                router.push("/paystack/callback")
            }
            else {
                toast("This page is locked!");
            }

        } catch (err) {
            toast.error("An error occurred");
        }

    }


    return (
        <>
            <h1 className="jumbotron text-center square"> Become Instructor</h1>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 text-center'>
                        <div className='pt-4'>
                            <UserSwitchOutlined className='display-1 pb-3' />
                            <br />

                            <h2>Setup PayOut to Publish Courses</h2>
                            <p className='lead text-warning'>Geekbits Academy partners with Paystack to transfer earnings to your bank account.</p>

                            {/*------------------------------------------------ Conditionals ---------------------------------------- */}

                            {/* <form onSubmit={handleSubmit}>

                                {!hidden && (
                                    <>
                                        <input type="text" placeholder="Enter Business Name" required className="form-control mb-4 p-4" value={bizname} onChange={e => setBizname(e.target.value)} />
                                        <input type="text" placeholder="Enter Account Number" required className="form-control mb-4 p-4" value={accNumber} onChange={e => setAccNumber(e.target.value)} />
                                        <input type="text" placeholder="Enter bank Name" required className="form-control mb-4 p-4" value={bank} onChange={e => setBank(e.target.value)} />

                                        < button disabled={!bizname || !accNumber || !bank || loading} type="submit" className="form-control btn btn-lg btn-primary">
                                            {loading ? < SyncOutlined spin /> : "Submit"}
                                        </button>
                                    </>
                                )}

                            </form>

                            {hidden && (
                                <Button
                                    className='mb-3'
                                    type='primary'
                                    block
                                    shape='round'
                                    icon={loading ? <LoadingOutlined /> : <SettingOutlined />}
                                    size="large"
                                    onClick={becomeInstructor}
                                    disabled={user && user.role && user.role.includes("instructor") || loading}>
                                    {loading ? "Processing..." : "Payout Setup"}
                                </Button>
                            )} */}

                            {/*---------------------------------------------Trial 2 ----------------------------------------------*/}

                            <form id='my-form' onSubmit={handleSubmit}>

                                {!hidden && (
                                    <>
                                        <input type="text" placeholder="Enter Business Name" required className="form-control mb-4 p-4" value={bizname} onChange={e => setBizname(e.target.value)} />
                                        <input type="text" placeholder="Enter Account Number" required className="form-control mb-4 p-4" value={accNumber} onChange={e => setAccNumber(e.target.value)} />
                                        <input type="text" placeholder="Enter bank Name" required className="form-control mb-4 p-4" value={bank} onChange={e => setBank(e.target.value)} />
                                    </>
                                )}

                            </form>

                            {hidden ? (
                                <Button
                                    className='mb-3'
                                    type='primary'
                                    block
                                    shape='round'
                                    icon={loading ? <LoadingOutlined /> : <SettingOutlined />}
                                    size="large"
                                    onClick={becomeInstructor}
                                    disabled={user && user.role && user.role.includes("instructor") || loading}>
                                    {loading ? "Processing..." : "Payout Setup"}
                                </Button>
                            ) : (< button form='my-form' disabled={!bizname || !accNumber || !bank || loading} type="submit" className="form-control btn btn-lg btn-primary">
                                {loading ? < SyncOutlined spin /> : "Submit"}
                            </button>)}

                            <div className='lead'>You will be redirected to the courses dashboard after onboarding Process completion</div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default BecomeInstructor;



