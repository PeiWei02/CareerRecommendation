import ImageFile from "../models/image.js";

export const uploadImage = async (req, res) => {
  try {
    const file = new ImageFile({
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      data: req.file.buffer,
    });
    await file.save();
    res.status(200).send({
      message: "File uploaded successfully",
      fileId: file._id,
    });
  } catch (err) {
    res.status(500).send({ error: "Error uploading file" });
  }
};

export const getImage = async (req, res) => {
  try {
    const file = await ImageFile.findById(req.params.id);
    if (!file) {
      return res.status(404).send({ error: "File not found" });
    }
    const base64Data = file.data.toString("base64");

    res.json({
      contentType: file.contentType,
      data: base64Data,
    });
  } catch (err) {
    res.status(500).send({ error: "Error retrieving file" });
  }
};
