import React, { useState, useRef } from 'react';
import './Add.css';
import { assets } from '../../assets/assets'
import axios from "axios";
import { toast } from 'react-toastify';

const Add = ({url}) => {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    })

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try{
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
       // formData.append("image", image ? image : "");
        formData.get("image");

        // await uploadImage({
        //   image,
        // });
      
       // const response = await axios.post(`${url}/api/food/add`, formData);
       
       const response = await axios.post(`${url}/api/food/add`, formData,{
        headers: {
            "Content-Type": "multipart/form-data",
          },
       });

        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad"
            })
            setImage(false)
            toast.success(response.data.message)
        }
        else {
            toast.error(response.data.message)
        }
        }
        catch(error)
        {
            console.error("Error:", error.message);
        }
        
    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({
            ...data,
            [name]: value
        }))
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                {/* <form className='flex-col'> */}
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' />
                </div>

                <div className="add-category-price">
                    <div className="add-category flex-col"></div>
                    <p>Product category</p>
                    <select onChange={onChangeHandler} name="category">
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>

                    <div className="add-price flex-col"></div>
                    <p>Product price</p>
                    <input type="Number" onChange={onChangeHandler} value={data.price} name='price' placeholder='$20' />
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
            <div>
            </div>
        </div>
    );
}

export default Add;
