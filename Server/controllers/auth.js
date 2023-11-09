import User from "../models/user";
import { comaparePassword, hashPassword } from "../Utils/auth";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import AWS from "aws-sdk";

const awsConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    apiVersion: process.env.AWS_API_VERSION
};

const SES = new AWS.SES(awsConfig);


export const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;


        // Info Validation
        if (!name) return res.status(400).send("Enter Name");
        if (!email) return res.status(400).send("Enter Email");
        if (!password || password.length < 6) {
            return res.status(400).send("Enter password. Make sure it is more that 6 characters!");
        };


        // Password encryption

        const newHashedPassword = await hashPassword(password);

        // User exists

        let userExist = await User.findOne({ email }).exec();
 
        if (userExist) {
            return res.status(400).send("User Exists. Enter another email");
        } else {
            const user = new User({ name, email, password: newHashedPassword });
            await user.save();
            return res.json({ "OK": true });
        };


    } catch (err) {
        console.log(err);
        return res.status(400).send("Error! Try again.");
    }
}


export const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        // check if db has user with the email
        const user = await User.findOne({ email }).exec();

        if (!user) return res.status(400).send("No User Found!");

        //check password
        const match = await comaparePassword(password, user.password)

        if(!match) {
            return res.status(400).send("Wrong Password");
        }

        // create signed JWT
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        //return user and token to client, exclude hashed password
        user.password = undefined;

        res.cookie("token", token, { // send token in cookie
            httpOnly: true,
            // secure: true
        });

        res.json(user);



    } catch (err) {
        console.log(err)
        return res.status(400).send("Error. Try again")
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.json({ message: "Signout Success" });
    } catch (err) {
        console.log(err);
    }
}


export const currentUser = async (req, res) => {
    try {
        const user = await User.findById(req.auth._id).select("-password").exec();
        return res.json({ ok: true });
    } catch (err) {
        console.log(err);
    };
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const shortCode = nanoid(6);
        const user = await User.findOneAndUpdate({ email }, { passwordResetCode: shortCode });

        if (!user) return res.status(400).send("User not found");

        // Prepare Email:

        const params = {
            Source: process.env.EMAIL_FROM,
            Destination: {
                ToAddresses: [email]
            },
            ReplyToAddresses: [process.env.EMAIL_FROM],
            Message: {
                Body: {
                    Html: {
                        Charset: 'UTF-8',
                        Data: `
                        <html>
                          <h1>Reset Password</h1>
                          <p>Use this code to reset your password</p>
                          <h2 style="color: red">${shortCode}</h2>
                          <i>geekbits.io</i>
                        </html>
                    `
                    }

                },
                Subject: {
                    Charset: "UTF-8",
                    Data: "Reset Password"
                }
            },

        }

        const emailSent = SES.sendEmail(params).promise();
        emailSent.then((data) => {
            console.log(data);
            res.json({ ok: true });
        }).catch((err) => {
            console.log(err);
        })

    } catch (err) {
        console.log(err);
    }
};


export const resetPassword = async (req, res) => {
    try {
        const { email, code, newPassword } = req.body;

        const hashed = await hashPassword(newPassword);

        // get code from backend
        const user = User.findOneAndUpdate({email, passwordResetCode: code }, {password: hashed, passwordResetCode: "" }).exec();

        res.json({ ok: true });
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error! Try again");
    }

}