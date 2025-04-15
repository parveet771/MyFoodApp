import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";
import upload from "../middleware/upload.js";
import path from "path";

const foodRouter = express.Router();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "uploads/");
//     },
//     filename: function (req, file, cb) {
//        // console.log("Uploaded File Details:", file); 
//        // cb(null, `${Date.now()}-${file.originalname}`); 
//        cb(null, Date.now() + path.extname(file.originalname));
//     }
// });
//debugger;

// const storage = multer.diskStorage({
//     destination:  "uploads",
//     filename:(req, file, cb) => {       
//        return cb(null, `${Date.now()}-${file.originalname}`); 
//     }
// });

//
// const storage = multer.diskStorage({
//     destination: "uploads",
//     filename: (req, file, cb) => {
//         //console.log("Uploaded File Details:", req.file);
//         return cb(null, `${Date.now()}(${file.originalname})`);
//       // return cb(null, "");
//     }
// });


//const upload = multer({ storage: storage })

// Route
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;


// Image Storage Engine
// const storage = multer.diskStorage({
//     destination: "uploads",
//     filename: (req, file, cb) => {
//         console.log("Uploaded File Details:", req.file);
//        // return cb(null, `${Date.now()}(${file.originalname})`);
//        return cb(null, "");
//     }
// });

