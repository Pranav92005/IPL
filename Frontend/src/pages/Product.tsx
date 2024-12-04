import { useEffect } from "react";

import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { API_ROUTE_URL } from "@/config";
import { useState } from "react";
import toast from "react-hot-toast";




   


interface Productdetail {

    name: string;
    price: number;
    iplteam: string;
    description: string;
    countInStock: number;
    image: string;
    category: string;
}





export default function Product() {
  const[Product,setProduct]=useState<Productdetail>();
  const[searchParams]=useSearchParams();
  const[loading,setloading]=useState(false);
    const Productid=searchParams.get('id') ;
    console.log(Productid);
    useEffect(() => {
        // Fetch the product with the given ID
        setloading(true);
        const token = localStorage.getItem('token');
        axios.get(`${API_ROUTE_URL}/product/${Productid}`, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
            console.log(response);
            const data = response.data as Productdetail;
            // Set the product data in the state
            setProduct(data);
            setloading(false);
        }).catch((error) => {
            console.error(error);
            toast.error("Something went wrong");
        });

    },[]);
  return (
    <>
    {
        loading && <div>Loading...</div>
    }
    
    

    


    
     <div>
      
      <div>
        <div>
          <div>
            <div className="mx-2 mt-6 ">
              <div className="bg-white p-4 m-2 rounded-lg shadow-md h-fit  ">
                <img src={`${Product?.image}`} alt="product" width={200} className=" object-contain " />
                <h2 className="text-xl font-bold mt-2">{Product?.name}</h2>
                <p className="text-gray-700">Price: {Product?.price}</p>
                <p className="text-gray-700">IPL Team: {Product?.iplteam}</p>
               
                
                <p className="text-gray-700">Description: {Product?.description}</p>
                <p className="text-gray-700">Left: {Product?.countInStock}</p>
                <div >
                
                <button className="bg-white-500 text-black border-slate-600 border-2 p-2 rounded-md mt-2">Buy Now</button>
                </div>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    
    </>
   
  )
}




