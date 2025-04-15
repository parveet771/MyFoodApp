import mongoose from "mongoose";

export const connectDB = async() =>{
    await mongoose.connect('mongodb+srv://parveetkaur02:heCus1NA1cIGogcU@cluster0.mh0wd24.mongodb.net/FOODAPP').then(()=> console.log("DB Connected"))
}
//app

//mongodb+srv://parveetkaur02:heCus1NA1cIGogcU@cluster0.mh0wd24.mongodb.net/FOODAPP').then(()=> console.log("DB Connected"))
//mongodb+srv://parveetkaur02:<db_password>@cluster0.mh0wd24.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0