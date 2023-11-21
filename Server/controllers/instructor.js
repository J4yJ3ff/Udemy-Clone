import User from "../models/user";
import paystack from "paystack-api";

const paystackClient = paystack(process.env.PAYSTACK_SECRET_KEY);


export const makeInstructor = async (req, res) => {

    const info = req.body;

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
    };
}


export const getAccountStatus = async (req, res) => {

    try{
        const user = await User.findById(req.body.user._id).exec();
        const id = user.paystack_account_id // I don't understand why req.body.user._id cannot retrieve the id itself;
        
        
        const account = await paystackClient.subaccount.get({id})

        
        if(!account.status){
            return res.status(401).send("Unauthorized");
        } else {
            const statusUpdated = await User.findByIdAndUpdate(
                user._id,
                {
                    paystack_seller: account,
                    $addToSet: { role: "Instructor"},
                },
                {new: true}
            ).select("-password").exec();
            statusUpdated.password = undefined;

            res.json(statusUpdated);
        }

    } catch (err) {
        console.log(err);
    }
};


export const currentInstructor = async (req, res) => {
    try {
        let user = await User.findById(req.auth._id).select("-password").exec();

        if (!user.role.includes("Instructor")) {
            return res.sendStatus(403);
        } else {
            res.json({ok: true});
        }
    } catch (err) {
        console.log(err);
    }
}