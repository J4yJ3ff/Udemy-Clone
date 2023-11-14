import User from "../models/user";
import paystack from "paystack-api";

const paystackClient = paystack(process.env.PAYSTACK_SECRET_KEY);


export const makeInstructor = async (req, res) => {

    const info = req.body;
    console.log(info);
    // find user from db
    const user = await User.findById(req.body.user._id).exec();
    // console.log(user);


    // if user dont have payment account id, create new. 
    if (!user.paystack_account_id) {

        // with paystack you must first include business name, email, bank and account number
        // before you can get an id for onboarding.
        const data = {
            business_name: info.bizname,
            primary_contact_email: user.email,
            settlement_bank: info.bank,
            account_number: info.accNumber,
            percentage_charge: 1.5,

        }

        const createId = await paystackClient.subaccount.create(data);

        user.paystack_account_id = createId.data.id;

        await user.save();
    };

    if (user.paystack_account_id){
        res.send(user);
    }
    


    // create account link based on account id(frontend complete onboarding)
    // res.json("https://api.paystack.co/subaccount/:993952");
    // const accountLink = await paystackClient.misc.createAccountLink({
    //     account: user.paystack_account_id,
    //     refresh_url: process.env.PAYSTACK_REDIRECT_URL,
    //     return_url: process.env.PAYSTACK_REDIRECT_URL,
    //     type: 'account'
    // });

    
    // console.log(accountLink);
    // // Send the account link as a JSON response to the frontend
    // res.json({ accountLink: accountLink.data.data });
   

    //pre-fill any info such as email, then send url response to frontend.
    // send the account link as json response to frontend. 
}