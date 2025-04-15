import React, { useState, useEffect, useRef} from 'react';
import './List.css';
import axios from "axios";
import { toast } from "react-toastify";

const List = ({url}) => {
  
    const [list, setList] = useState([]);

    

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
          //  const response = await axios.get("http://localhost:3000/api/food/list");
            http://localhost:5173/api/food/list
        //     console.log("foodlist-->"+response.data.data);
        //     console.log("foodlist-->"+JSON.stringify(response.data.data));
        // console.log("foodlist-->"+JSON.stringify(response));
            if (response.data.success) {
                setList(response.data.data);
            }
        } catch (error) {
            toast.error("Failed to fetch list");
           // console.error(error);
        }
    };

    
       const removeFood = async (foodId) => {
        try {
            const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
            await fetchList();
            if (response.data.success) {
                toast.success("Food item removed successfully");
                fetchList(); // Refresh the list after removal
            } else {
                toast.error(response.data.message || "Failed to remove food item");
            }
        } catch (error) {
            toast.error("An error occurred while removing the food item");            
        }
    };
    
    useEffect(() => {
        fetchList();
    }, []);


    return(
        <div className="list add flex-col">
    <p>All Foods List</p>
    <div className="list-table">
        <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
        </div>
        {list.map((item, index) => {
    return (
        <div key={index} className='list-table-format'>
            <img src={`${url}/images/${+item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={() => removeFood(item._id)}>X</p>
        </div>
    );
})}
    </div>
</div>
    )
};

export default List;