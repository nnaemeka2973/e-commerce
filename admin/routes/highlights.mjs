import { Router } from "express";
import { highlightsProducts } from "../Constants/index.mjs";

const router = Router();

router.get("/highlights", (req, res) => {
  res.send(highlightsProducts);
});

export default router;