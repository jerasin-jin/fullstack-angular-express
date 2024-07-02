import { Request, Response, Router } from "express";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { productRepo } from "./products";

const router = Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const uploadFolder = path.join(__dirname, "../../../src/images");

  const form = formidable({
    multiples: true,
    maxFieldsSize: 50 * 1024 * 1024,
    uploadDir: uploadFolder,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(400).json({ status: "failed", message: "upload file failed" });
    }

    console.log("fields.image", fields.image);

    const fileName = `product_${fields.productId}.png`;

    const base64Data = fields.image.toString();
    const str = base64Data.replace(/^data:image\/png;base64,/, "");

    fs.writeFile(`${uploadFolder}/${fileName}`, str, "base64", (err) => {
      if (err) {
        console.log("error", err);
        throw err;
      }
    });

    const productId = parseInt(fields.productId.toString());
    const product = await productRepo().findOne({
      where: { id: productId },
    });
    await productRepo().save({ ...product, img: fileName });

    res
      .status(201)
      .json({ status: "success", message: "upload image success" });
  });
});

export { router };
