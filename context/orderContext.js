import { View, Text } from 'react-native'
import React,{createContext,useState,useEffect} from 'react'
import axios from "axios"

const orderContext=createContext();
const OrderProvider = ({children}) => {
//   global states
const[fullTruck,setFullTruck]=useState("");
const[changeTruck,setChangeTruck]=useState("");
// getting all the trucks

// const getTruck=async()=>
//     {
//      const {data}= await axios.get("/getAllTruckDetails");
//     console.log(data.truck);
//      setFullTruck(data.truck);
//     }

    useEffect(
        ()=>{
        //   getTruck();
      },
      []
    );

return (
    <orderContext.Provider value={[fullTruck,setFullTruck]}>
        {children}
    </orderContext.Provider>
)
}

export {orderContext,OrderProvider}