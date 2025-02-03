import { Router } from "express";

import { authentication } from "../middlewares/auth.middelware.js";

import { upload } from "../middlewares/multer.middleware.js";

import { addPet, getPets, getPetById, setPetAsAdopted, removePet } from "../controllers/pet.controller.js";

const router = Router();

router.use(authentication);

router.route("/").get(getPets);

router.route("/add-pet").post(upload.array("images", 6), addPet);

router.route("/:petId").get(getPetById);

router.route("/:petId/set-adopted").patch(setPetAsAdopted)

router.route("/:petId/remove-pet").get( removePet )

export default router;
