import express from "express";
import {
  // createActor,
  // deleteActor,
  // getActor,
  getAllProducts,
  // updateActor,
} from "../controllers/products.controller";

const router = express.Router();

router.route("/").get(getAllProducts);
// router.route("/:id").get(getActor).patch(updateActor).delete(deleteActor);

export default router;
