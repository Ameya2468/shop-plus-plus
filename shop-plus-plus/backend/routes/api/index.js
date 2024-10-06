import {Router} from "express";
import loginUser from "./login-user.js";
import signUpUser from "./signup-user.js";
import catchAll from "./catch-all.js";
import verify from "./verify.js";
import updateUser from "./update-user.js";
import updatePassword from "./update-password.js";
import getProduct from "./getProduct.js";
import { getSingleProduct } from "./getSingleProduct.js";
import { productPhoto } from "./productPhoto.js";
import formidable from 'express-formidable';
import { deleteUser } from "../../controllers/user.js";
import {
   createProduct,
  productFiltersController,
  productCountController,
  productListController,
  searchProductController ,
  relatedProductController,
  braintreeToken,
  braintreePayment,
  getOrders
  } from "../../controllers/product.js";
import {
  categoryController,
  singleCategoryController,
  
} from "../../controllers/category.js";

import {
  loginUserValidation,
  signUpUserValidation,
  jwtValidation,
} from "../../utils/validation.js";
import protectApi from "../../utils/protectApi.js";

const router = Router();
//Routes for User and Authentication
router.post("/login", loginUserValidation, loginUser);
router.post("/signup", signUpUserValidation, signUpUser);
router.put("/updateprofile",protectApi,updateUser);
router.patch("/updatepassword",protectApi,updatePassword);
router.post("/verify", jwtValidation, verify);
router.delete("/delete",protectApi,deleteUser);

//Routes For Product
router.post("/create-product",formidable(),createProduct);
router.get('/get-product',getProduct);
router.get("/get-product/:_id",getSingleProduct);
router.get('/product-photo/:_id',productPhoto);

//getALl category
router.get("/get-category", categoryController);

//single category
router.get("/single-category/:_id", singleCategoryController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", relatedProductController);

//payments routes
//token
router.get('/braintree/token',braintreeToken);

//payment
router.post('/braintree/payment',protectApi,braintreePayment)

//orders
router.get("/orders/:id",protectApi, getOrders);
router.use(catchAll);

export default router