import { View, Text,StyleSheet, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import FooterMenu from '../components/Menus/FooterMenu';
import axios from "axios"
import PostTextAndBox from '../components/Forms/PostTextAndBox';
import moment from 'moment';
import filter from 'lodash.filter';
const About = () => {

  const[allOrders,setAllOrders]=useState("");
  const[orders,setOrders]=useState("");
  const[search,setSearch]=useState("");
  const getAllPendingOrders=async()=>
    {
     const {data}= await axios.get("/getAllPendingOrders");
      console.log(data.Orders);
      setOrders(data.Orders);
      setAllOrders(data.Orders);
    }

    useEffect(()=>{
      getAllPendingOrders();
    },[]);

    const emptyfunction=()=>{

    }

    const searchFunction=(query)=>{
      const formattedQuery= query.toLowerCase();
      const filteredData=filter(allOrders,(user)=>{
        return contains(user,formattedQuery);
      });
      setOrders(filteredData);
    }

    const contains=({ClientName,ProductName},query)=>{
      ClientName=ClientName.toLowerCase();
      ProductName=ProductName.toLowerCase();
      if(ClientName.includes(query)|| ProductName.includes(query) )
        {
          return true;
        }
        else
        {
          return false;
        }
    }

  return (
    <View style={styles.container}>
      
      
      <Text style={styles.textHeading}>Total Pending Orders : {orders.length}</Text>
      <PostTextAndBox
      title="Enter Client or Product Name"
      search={search}
      setSearch={setSearch}
      handleSearch={searchFunction}
      setShow={emptyfunction}
      />
      <FlatList
        
        data={orders}
        keyExtractor={(item)=>item._id}
        renderItem={
          ({item})=>
            (
              <View style={styles.card}>
                <View>
                <Text style={{fontWeight:"bold"}}>Client Name : {item.ClientName}</Text>
                <Text style={{fontWeight:"bold"}}>Product Name : {item.ProductName}</Text>
                <Text>Balanced Quantity : {item.BalancedQuantity}kg</Text>
                <Text>Created Date : {moment(item.createdAt).format("DD:MM:YYYY")}</Text>

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
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        margin:10,
       
        justifyContent:"space-between",
    },
    textHeading:{
      fontSize:25,
      fontWeight:"bold",
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
  
export default About