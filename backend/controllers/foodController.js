import foodModel from "../models/foodmodels.js";
import fs from 'fs'

const addFood = async (req, res) => {
   
  const imageUrl = req.file ? `/uploads/${req.file.filename}`: "";

       const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image:imageUrl
    })     

    // if(!imageUrl) {
    //     return res.status(400).json({
    //         success: false,
    //         message: `Missing fields: ${!image_filename ? 'image'  + image_filename: "http://localhost:5173/"+image_filename}`,
    //     });
    // }   

    try {         
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
       // const foods = await foodModel.find({});       
        const food = await foodModel.findById(req.body.id);
        fs.unlink('uploads/${food.image}',()=>{})       
        await foodModel.findByIdAndDelete(req.body.id);

        res.json({ success: true, message: "removed" });
    }catch(error){
        const foods = await foodModel.find({});       
        res.json({ success: false, message: "Error" });
    }
}

export {addFood, listFood, removeFood};

  