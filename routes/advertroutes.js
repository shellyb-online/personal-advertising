import { Router } from "express";
import { addAdvert, deleteAdvert, getAdvertById, getAllAdverts, updateAdvert,  } from "../controllers/advertControllers.js";



// create a router
const advertRouter = Router();

advertRouter.post("/adverts", addAdvert);

advertRouter.get("/adverts", getAllAdverts);

advertRouter.get("/adverts/:id", getAdvertById);

advertRouter.patch("/adverts/:id", updateAdvert);

advertRouter.delete("/adverts/:id", deleteAdvert);




export default advertRouter;
