import { View, Text,StyleSheet, TextInput, FlatList,SafeAreaView, TouchableOpacity, ScrollView} from 'react-native'
import React,{useState,useEffect, useContext} from 'react'
import FooterMenu from '../components/Menus/FooterMenu';
import axios from "axios"
import filter from 'lodash.filter';
import PostTextAndBox from '../components/Forms/PostTextAndBox';
import SubmitButton from '../components/Forms/SubmitButton';
import { orderContext } from '../context/orderContext';
import { LogBox } from 'react-native';
const Post =  ({navigation}) => {
 
  const [clientSearch,setClientSearch]=useState("");
  const [productSearch,setProductSearch]=useState("");
  const [changeClientData,setChangeClientData]=useState([]);
  const[changeProductData,setChangeProductData]=useState([]);
  const[fullData,setFullData]=useState([]);
  const [balancedQuantity,setBalancedQuantity]=useState("");
  const [liftedQuantity,setLiftedQuantity]=useState("");
  const [truckNumber,setTruckNumber]=useState("");
  const[fullTruck,setFullTruck]=useContext(orderContext);
  const[selectedClient,setSelectedClient]=useState("Enter Client Name");
  const[selectedProduct,setSelectedProduct]=useState("Enter Product Name");
  const[isClientClicked,setIsClientClicked]=useState(false);
  const[isProductClicked,setIsProductClicked]=useState(false);
  const[allClientName,setAllClientName]=useState([]);
  const [allProductName,setAllProductName]=useState([]);

  const getOrders=async ()=>{
    const {data}= await axios.get("/getAllOrders");
    setFullData(data.Orders);
    var i;
    var clientName=[];
    var productName=[];
    let map=new Map();
    for(i=0;i<data.Orders.length;i++)
      {
        if( !map.has(data.Orders[i].ClientName))
          {
            map.set(data.Orders[i].ClientName,1);
            clientName.push(data.Orders[i].ClientName);
          }
          if( !map.has(data.Orders[i].ProductName))
            {
              map.set(data.Orders[i].ProductName,1);
              productName.push(data.Orders[i].ProductName);
            }
      }
      setAllClientName(clientName);
      setAllProductName(productName); 
      setChangeClientData(clientName);
      setChangeProductData(productName);
  }

   useEffect(  ()=>
      {
        getOrders();
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        LogBox.ignoreAllLogs();
        console.warn = () => {};
      },[]);
  
      if (__DEV__) {
        const ignoreWarns = [              
          "VirtualizedLists should never be nested inside plain ScrollViews",              
        ];
      
        const warn = console.error;
        console.error = (...arg) => {
          for (const warning of ignoreWarns) {
            if (arg[0].startsWith(warning)) {
              return;
            }
          }
          warn(...arg);
        };
        
      }
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  const handleClientSearch= (query)=>
    {
       const formattedQuery= query.toLowerCase();
      //  filteredData is an array of unique client names
      const filteredData=filter(allClientName,(user)=>{
        return contains(user,formattedQuery);
      });

      setChangeClientData(filteredData);
      }
      
      const contains=(ClientName,query)=>
        {
        ClientName=ClientName.toLowerCase();
        if(ClientName.includes(query))
          {
            return true;
          }
          else
          {
            return false;
          }
      }

      const handleProductSearch= (query)=>
        {
           const formattedQuery= query.toLowerCase();
          //  filteredData is an array of unique product names
          const filteredData=filter(allProductName,(user)=>{
            return containsProduct(user,formattedQuery);
          });
        setChangeProductData(filteredData);
          }
          
          const containsProduct=(ProductName,query)=>
            {
            ProductName=ProductName.toLowerCase();
            if(ProductName.includes(query))
              {
                return true;
              }
              else
              {
                return false;
              }
            }
      
      const getBalancedQuantity=async(productName)=>
        {
        const {data}=await axios.post("/TotalBalancedQuantity",{
          ProductName:productName,
          ClientName:selectedClient,
        });
        // console.log(data.TotalBalancedQuantity);
        setBalancedQuantity(data.TotalBalancedQuantity);
        // console.log(data);
      }

      const createTruck=async()=>{
      const {data}= await axios.post("/createTruckDetail",{
        ProductName:selectedProduct,
        ClientName:selectedClient,
        WeightLoaded:liftedQuantity,
        TruckNumber:truckNumber
      });
      // console.log(data);
      // setFullTruck([...fullTruck,data.data]);
      alert("Truck Details Created Successfully");
      navigation.navigate("Home");
      }

      const emptyfunction=(par)=>{

      }

      // console.error = () => {};
      // The above line will remove all types of error logs from the terminal
      return (
        <View style={styles.container}>
          <ScrollView>
        <View>
          <Text style={styles.heading}>Enter Client Name</Text>
          <TouchableOpacity 
          style={styles.dropDownSelect}
          onPress={()=>{
            setIsClientClicked(!isClientClicked);
          }}
          >
          <Text style={styles.text}>{selectedClient}</Text>
          </TouchableOpacity>
          {
            isClientClicked?
          <View style={styles.dropDownArea}>
            <TextInput
            placeholder='Enter Client Name'
             style={styles.searchInput}
             value={clientSearch}
            //  onTouchStart={()=>setClientShow(true)}
             onChangeText={(text)=>{
              setClientSearch(text)
              handleClientSearch(text)
             }}
             />

             <FlatList
        nestedScrollEnabled
        data={changeClientData}
        
        renderItem={
          ({item,index})=>
            (
              
          <TouchableOpacity 
          style={styles.countryItem}
          onPress={()=>{
            setSelectedClient(item);
            setChangeClientData(allClientName);
            setClientSearch("");
            setIsClientClicked(false);
            }}>
          <Text style={styles.textName}>{item}</Text>
          </TouchableOpacity>            
          )
        }
        />
          
          </View>:null
            
          } 

{/* Product Details */}
        <Text style={styles.heading}>Enter Product Name</Text>
          <TouchableOpacity 
          style={styles.dropDownSelect}
          onPress={()=>{
            setIsProductClicked(!isProductClicked);
          }}
          >
          <Text style={styles.text}>{selectedProduct}</Text>
          </TouchableOpacity>
          {
            isProductClicked?
          <View style={styles.dropDownArea}>
            <TextInput
            placeholder='Enter Product Name'
             
             style={styles.searchInput}
             value={productSearch}
            //  onTouchStart={()=>setClientShow(true)}
             onChangeText={(text)=>{
              setProductSearch(text)
              handleProductSearch(text)
             }}
             />

             <FlatList
        nestedScrollEnabled
        data={changeProductData}
       
        renderItem={
          ({item,index})=>
            (
              
          <TouchableOpacity 
          style={styles.countryItem}
          onPress={()=>{
            setSelectedProduct(item);
            setChangeProductData(allProductName);
            setProductSearch("");
            setIsProductClicked(false);
            getBalancedQuantity(item);
            }}>
          <Text style={styles.textName}>{item}</Text>
          </TouchableOpacity>            
          )
        }
        />
          
          </View>:null
            
          } 
      
      <PostTextAndBox
      title="Balanced Quantity"
      search={`${balancedQuantity}`}
      setSearch={emptyfunction}
      setShow={emptyfunction}
      handleSearch={emptyfunction}
      />

    <PostTextAndBox
    title={"Enter Quantity to be lifted"}
      search={`${liftedQuantity}`}
      setSearch={setLiftedQuantity}
      setShow={emptyfunction}
      handleSearch={emptyfunction}
    />

<PostTextAndBox

    title={"Enter Truck Number"}
      search={`${truckNumber}`}
      setSearch={setTruckNumber}
      setShow={emptyfunction}
      handleSearch={emptyfunction}
    />

  
    <TouchableOpacity
      style={styles.submtBtn}
      onPress={createTruck}
      >
      <Text style={styles.btnText}>
        CREATE TRUCK
      </Text>
      </TouchableOpacity>
      
      
  </View>
</ScrollView>
     <View style={{flex:1,justifyContent:"flex-end",}}>
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
    heading:{
      fontSize:25,
      fontWeight:"bold",
    },
    dropDownSelect:{
      width:"99%",
      height:50,
      borderRadius:10,
      borderWidth:0.5,
      borderColor:"#8e8e8e",
      alignSelf:"center",
      backgroundColor:"#ffffff",
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
      paddingLeft:15,
      paddingRight:15,
      
        },
        dropDownArea:{
          width:"90%",
          height:300,
          borderRadius:10,
          marginTop:20,
          backgroundColor:"#fff",
          elevation:5,
          alignSelf:"center"
        },
        searchInput:{
          width:"85%",
          height:50,
          borderRadius:10,
          borderWidth:0.5,
          borderColor:"#8e8e8e",
          alignSelf:"center",
          marginTop:20,
          paddingLeft:15,
        },
        countryItem:{
          width:"80%",
          height:50,
          borderBottomWidth:0.2,
          borderBottomColor:"#8e8e8e",
          alignSelf:"center",
          justifyContent:"center",
         
        },

    inputBox:{
      backgroundColor:"#ffffff",
      width:320,
      marginTop:10,
      fontSize:16,
      paddingLeft:15,
      borderColor:"gray",
      borderWidth:1,
    },
    textHeading:{
      fontSize:25,
      fontWeight:"bold",
    },
    textName:{
      fontSize:30,
      marginLeft:10,
      fontWeight:"600"
    },
    submtBtn:{
      marginTop:20,
      backgroundColor:"#1e2225",
      height:50,
      marginHorizontal:50,
      borderRadius:80,
      justifyContent:"center",
      marginBottom:20,
    },
    btnText:{
      color:"#ffffff",
      textAlign:"center",
      fontSize:24,
      fontWeight:"400",
  },
  text:{
    fontWeight:"bold",
    fontSize:24,
    color:"blue"
  }
  });
  
export default Post