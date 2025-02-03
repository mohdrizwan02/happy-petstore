import { Router } from "express";
import { upload } from '../middlewares/multer.middleware.js'

import { registerUser , loginUser , logoutUser , refreshTokens ,changePassword , getCurrentUser ,updateProfileImage , updateProfileDetails , getUserBlogs, getUserById, getUserProfile } from '../controllers/user.controller.js'

import { authentication } from "../middlewares/auth.middelware.js";
const router = Router()



router.route("/register").post(
    upload.single("profileImage"),
    registerUser
)



router.route("/get-user/:userId").get(authentication,getUserById)




router.route("/login").post(loginUser)

router.route("/logout").get(authentication,logoutUser)

router.route('/refresh-tokens').post(authentication , refreshTokens)

router.route("/change-password").post(authentication , changePassword)

router.route('/current-user').get(authentication , getCurrentUser )
router.route('/get-user-profile').get(authentication,getUserProfile)

router.route('/update-profile-image').patch(
    authentication ,
    upload.single("profileImage"),
    updateProfileImage
)

router.route("/update-profile-details").patch(authentication,updateProfileDetails)

router.route("/getblogs").get(authentication , getUserBlogs)






export default router