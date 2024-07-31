import { View, Text ,StyleSheet, FlatList, ScrollView, SafeAreaView, TouchableOpacity, Modal} from 'react-native'
import React,{useContext,useEffect, useState} from 'react'
import { AuthContext } from '../context/authContext'
import FooterMenu from '../components/Menus/FooterMenu'
import axios from 'axios'
import moment from "moment"
import { orderContext } from '../context/orderContext'
import PostTextAndBox from '../components/Forms/PostTextAndBox'
import filter from 'lodash.filter';
// import Calendar from "react-native-calendars/src/calendar"
import {Calendar } from "react-native-calendars"
const Home = () => 
  {
    // global state 
    const [state]=useContext(AuthContext);
    const[fullTruck,setFullTruck]=useContext(orderContext);
    const[changeTruck,setChangeTruck]=useState([]);
    const[search,setSearch]=useState("");
    const[showModal,setShowModal]=useState(false);
    const[truckDate,setTruckDate]=useState("");
  
    const getTodayDate=()=> {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      return `${year}-${month}-${day}`;
    }
      
    const getTruckByDate=async(date)=>{
    const {data}= await axios.post("/getTruckByDate",{createdAt:date});
    console.log(data);
    setChangeTruck(data.data);
    }

      useEffect(
        ()=>{
             const today= getTodayDate();
             setTruckDate(today);
             console.log(today);
              getTruckByDate(today);
      },
      [fullTruck]
    );

    // const emptyfunction=()=>{

    // }

    // const searchFunction=(query)=>{
    //   const formattedQuery= query.toLowerCase();
    //   const filteredData=filter(fullTruck,(user)=>{
    //     return contains(user,formattedQuery);
    //   });
    //   setChangeTruck(filteredData);
    // }

    // const contains=({ClientName,ProductName,createdAt},query)=>{
    //   ClientName=ClientName.toLowerCase();
    //   ProductName=ProductName.toLowerCase();
    //   createdAt=moment(createdAt).format("DD:MM:YYYY");
    //   if(ClientName.includes(query)|| ProductName.includes(query)|| createdAt.includes(query) )
    //     {
    //       return true;
    //     }
    //     else
    //     {
    //       return false;
    //     }
    // }

  return (
    <View style={styles.container} >
        
      <Text style={styles.textHeading}>Total Truck Dispatched on {truckDate}  is  {changeTruck.length}</Text>
      
        {/* <PostTextAndBox
        title="Enter Client or Product or Date"
        search={search}
        setSearch={setSearch}
        handleSearch={searchFunction}
        setShow={emptyfunction}
        /> */}

        <TouchableOpacity
          style={styles.Button}
          onPress={()=>setShowModal(true)}
          >
            <Text 
            style={
              {fontSize:22,
                color:"white",
                textAlign: 'center'
            }}>
              Select Date
              </Text>
            <Modal visible={showModal}>
          <Calendar
          style={{
            borderRadius:10,
            elevation:6,
          }}
          hideExtraDays={true}
          onDayPress={day => 
            {
          // console.log('selected day', day);
          setTruckDate(day.dateString);
          getTruckByDate(day.dateString);
          // console.log("Truck Date is ", truckDate);
          setShowModal(false);
          }}
/>
        </Modal>
          </TouchableOpacity>
        <FlatList
        
        data={changeTruck}
        keyExtractor={(item)=>item._id}
        renderItem={
          ({item})=>
            (
              <View style={styles.card}>
                <View>
                <Text style={{fontWeight:"bold"}}>Client Name : {item.ClientName}</Text>
                <Text style={{fontWeight:"bold"}}>Product Name : {item.ProductName}</Text>
                <Text>Created Date : {moment(item.createdAt).format("DD:MM:YYYY")}</Text>
                <Text>Quantity Dispatched : {item.WeightLoaded}kg</Text>
                <Text>Truck Number : {item.TruckNumber}</Text>
               
              </View>
              </View>
              
            )
        
          }
          />
          

      <View>
        <FooterMenu/>
        </View>
     
    </View>
  )
};


const styles=StyleSheet.create({

  Button:{
    backgroundColor:"black",
    borderRadius:10,
    width:"50%",
    justifyContent:"center",
    margin:10,
    alignSelf:"center",
    height:35,
  },
  textHeading:{
    fontSize:25,
    fontWeight:"bold",
  },
  container:{
      flex:1,
      margin:10,
      // justifyContent:"space-between",
  },
  
  card:{
    width:"97%",
    backgroundColor:"#ffffff",
    borderWidth:2,
    padding:20,
    borderColor:"gray",
    borderRadius:5,
    marginVertical:5
  }
});

export default Home