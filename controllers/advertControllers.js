import { AdvertModel } from "../models/advertmodels.js";

// create new advert

export const addAdvert = async (req, res, next) => {
    try {
        const { error, value } = addAdvertValidators.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }

        const newadvert = await AdvertModel.create(req.body);
        // const savedAdvert = await advert.save();
        res.status(201).json(newadvert);
    } catch (error) {
        next(error);
    }

};


// Get all advert
export const getAllAdverts = async (req, res, next) => {

    try {
        const { filter = "{}", limit = 10, skip = 0 } = req.query;
        const adverts = await AdvertModel
            .find(JSON.parse(filter))
            .limit(limit)
            .skip(skip);
        res.status(200).json(adverts);
    } catch (error) {
        next(error);
    }
};

// Retrieving an advert by an id (both vendor and a user)

export const getAdvertById = async (req, res, next) => {
    try {
        // const advertId = req.params.id;
        const advertId = await AdvertModel.findById(req.params.id);
        if (!advertId) {
            return res.status(404).json("No advert found");
        }
        res.status(200).json(advertId);
    } catch (error) {
        next(error);

    }

};

// Update the advert in the database using its ID
export const updateAdvert = async (req, res, next) => {
    try {
        const updateAdvert = await AdvertModel.findByIdAndUpdate(req.params.id.req.body, { new: true });
        if (!updateAdvert) {
            return res.status(404).json("update wasnt successfull");
        }
        // const { error } = advertValidationSchema.validate(req.body);
        // if (error) {
        //     return res.status(400).json("Advert updated successfully");
        // }
        // await AdvertModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updateAdvert);
    } catch (error) {
        next(error);
    }
}
// export const updateAdvert = async (req, res, !next) => {
// try {


//     const advertId = req.params.Id;
//     const updateAdvert = await AdvertModel.findByIdAndUpdate(advertId, req.body, { new: true });
//     if (!updateAdvert) {
//         return res.status(404).json({ status: 'error', message: 'advert not found' });
//     }


//     res.status(200).json({ status: 'success', data: updateAdvert });
// } catch (error) {
//     next(error);

// }
// };



// Delete an advert
// export const deleteAdvert = async (req, res, next) => {
//     try {
//         const advertId = req.params.Id;
//         const deleteAdvert = await AdvertModel.findByIdAndDelete(advertId);
//         if (!deleteAdvert) {
//             return res.status(404).json({ status: 'error', message: 'advert not found' });
//         }
//         res.status(200).json({ status: 'success', message: 'advert deleted successfully' });
//     } catch (error) {
//         next(error);

//     }
// };

export const deleteAdvert = async (req, res, next) => {
    try {
        const deleteAdvert = await AdvertModel.findByIdAndDelete({ _id: req.params.id, });
        if (!deleteAdvert) {
            res.status(404).json("Nothing to Delete");
        }
        res.status(200).json("Deleted successfully");
    } catch (error) {
        next(error);
    }
};  