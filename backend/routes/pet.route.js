import { Router } from "express";

import { authentication } from "../middlewares/auth.middelware.js";

import { upload } from "../middlewares/multer.middleware.js";

import { addPet, getPets, getPetById, setPetAsAdopted, removePet ,getDogs , getDogsByFilter , getCats , getCatsByFilter} from "../controllers/pet.controller.js";

const router = Router();

router.use(authentication);

router.route("/get-pets").get(getPets);

router.route("/add-pet").post(upload.array("images", 6), addPet);

router.route("/get-pet/:petId").get(getPetById);

router.route("/get-pet/:petId/set-adopted").patch(setPetAsAdopted)

router.route("/get-pet/:petId/remove-pet").get( removePet )

router.route("/dogs/filter").post(getDogsByFilter)

router.route("/dogs").get(getDogs)

router.route("/cats").get(getCats)

router.route("/cats/filter").post(getCatsByFilter)

export default router;
