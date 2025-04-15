//import { model } from "mongoose";
import foodModel from "../models/foodmodels.js";
import fs from 'fs'

const addFood = async (req, res) => {
    // console.log("req.filename--> "+`${req}`);
   // console.log("req.filename--> "+req.originalname +`${req.file.filename} +${res.file.filename} +${res.originalname}`);
    //console.log("req.filename--> "+JSON.Stringify(req));
  // let image_filename = `${req.file}? ${req.originalname} + ${req.file.filename} +${res.file.filename} +${res.originalname}: null`;
  //let image_filename =     res ? `/uploads/${req.file.filename}` : null;
  //console.log(req.file);
  //const image_filename = req.file;

  const imageUrl = image_filename ? `http://localhost:3000/uploads/${req.file}`: null;
  console.log(imageUrl);

       const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image:imageUrl
    })  
    //const { name, description, price , category} = req.body;
    
    // Handle the image if it exists
    // const image_filename = req.file ? `/uploads/${req.file.filename}` : null;
   // console.log("Uploaded file:", req.file);

    if(!image_filename) {
        return res.status(400).json({
            success: false,
            message: `Missing fields: ${!image_filename ? 'image'  + image_filename: "http://localhost:5173/"+image_filename}`,
        });
    }
    //   const food = new foodModel({
    //     name,
    //     description,
    //     category,
    //     price,
    //     image: image_filename,
    //   });

    try {
       // console.log(food);       
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error adding food" });
    }
};
// Get all food list
 const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

//remove

 const removeFood = async(req, res) =>{
    try{    
        const foods = await foodModel.find({});
       // console.log(foods);
        const food = await foodModel.findById(req.body.id);
       // fs.unlink('uploads/${food.image}',()=>{})       
        await foodModel.findByIdAndDelete(req.body.id);

        res.json({ success: true, message: "removed" });
    }catch(error){
        const foods = await foodModel.find({});
        //console.log(foods);
        res.json({ success: false, message: "Error" });
    }
}

export {addFood, listFood, removeFood};

  