import { UserModel } from "../models/usermodels.js";
import { userLoginValidator, userRegisterValidator, userUpdateValidator } from "../validators/uservalidators.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const userRegister = async (req, res, next) => {
    try {
        // checking if inputed details are correct
        const { error, value } = userRegisterValidator.validate(req.body);
        if (error) {
            res.status(422).json(error);
        }

        //  check the database if the email exist already
        const user = await UserModel.findOne({ email: value.email });
        if (user) {
            res.status(200).json("user already exist");
        }

        const hashedpassword = bcrypt.hashSync(value.password, 10);

        // save to database
        await UserModel.create({
            ...value,
            password: hashedpassword
        });
        res.status(200).json("User Successfully registered")
    } catch (error) {
        next(error);
    }
};

export const userLogin = async (req, res, next) => {
    try {
        // validate the person credentials
        const { error, value } = userLoginValidator.validate(req.body);
        if (error) {
            res.status(422).json(error);
        }

        // find user with email
        const user = await UserModel.findOne({ email: value.email });
        if (!user) {
            res.status(404).json("Invalid Credentials");
        }
        // check for validity of password
        const correctpassword = bcrypt.compare(value.password, user.password);
        if (!correctpassword) {
            res.status(404).json("Invalid Credentials");
        }
        // now generate a token for the person
        const token = jwt.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY, {
            expiresIn: "24h",
        });
        res.json({
            message: "user logged in", accessToken: token,
        });
    } catch (error) {
        next(error);
    }
};

export const getProfile = async (req, res, next) => {
    try {
        const user = await UserModel
            .findById(req.auth.id)
            .select({
                password: false,
            });
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
    // console.log("Ben")
};

export const userLogout = (req, res, next) => {
    try {
        res.status(200).json("log out successfully");
    } catch (error) {
        next(error);
    }
};


// controllers for update and delete profile
export const deleteUserProfile = async (req, res, next) => {
    try {
        const deleteUser = await UserModel.findByIdAndDelete(req.auth.id);
        if (!deleteUser) {
            res.status(404).json("No User To Delete");
        }
        res.status(200).json("user deleted");
    } catch (error) {
        next(error);
    }
};

// export const updateUserProfile = async (req, res, next) => {
//     try {
//         const updateUserProfile = await UserModel.findByIdAndDelete(req.auth.id, req.body, { new: true });
//         if (!updateUserProfile) {
//             res.status(404).json("Unable To Update")
//         }
//         res.status(200).json("Details updated successfully");
//     } catch (error) {
//         next(error);
//     }
// };


// export const updateUserProfile = async (req, res, next) => {
//     try {
//       const updateUserProfile = await UserModel.findByIdAndUpdate(
//         req.auth.id,
//         req.body,
//         { new: true }
//       );
//       if (!updateUserProfile) {
//         res.status(404).json("Unable to update");
//       }
//       res.status(200).json("Details updated succesfully");
//     } catch (error) {
//       next(error);
//     }
//   };

export const updateUserProfile = async (req, res, next) => {
    try {
        // Validate the user request
        const { error, value } = userUpdateValidator.validate(req.body);
        if (error) {
            return res.status(422).json({ error: error.details[0].message });
        }
        // Find the user ID
        const updatedVendor = await UserModel.findByIdAndUpdate(
            req.params.id,
            value,
            { new: true }
        );
        if (!updatedVendor) {
            return res.status(404).json({ message: "user not found" });
        }
        //Send the updated vendor profile
        res.json("Profile updated successfully");
    } catch (error) {
        next(error);
    }
}
