import { View, Text ,StyleSheet, TextInput, Alert} from 'react-native'
import React,{useState,useContext} from 'react'
import { AuthContext } from '../../context/authContext';
import InputBox from '../../components/Forms/InputBox'
import SubmitButton from '../../components/Forms/SubmitButton';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import {AsyncStorage} from 'react-native';

const Login = ({navigation}) => {
    // Accessing the global states
   const [state,setState]= useContext(AuthContext);
    
    // Making states
    
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const[loading,setLoading]=useState(false);

    // Temporary function to get local storage 

    const LocalStorageData=async ()=>{
        let data=await AsyncStorage.getItem("@authAdmin");
    console.log("Local Storage Data is ",data);
    // console.log("Details of the current logged in Operator is ",await AsyncStorage.getItem("@authOperator"));
};  
    console.log("Login Page ");
    // function
    const handleSubmitAdmin=async ()=>{
        try {
            setLoading(true);
            if( !email || !password)
                {
                    setLoading(false);
                     Alert.alert("Please fill all the details");
                     return;
                }
                setLoading(false);
                const {data}= await axios.post("/AdminLogin",{email,password});
                data.user.password="";
                setState(data);
                await AsyncStorage.setItem("@auth", JSON.stringify(data));
              alert(data && data.message);  
              navigation.navigate("Home");
              console.log("Login Details ===>",{email,password});
            } catch (error) {
                alert(error.response.data.message);
                setLoading(false);
                console.log(error);
            }
        }
        // LocalStorageData();
        
    const handleSubmitOperator=async ()=>{
        try {
            setLoading(true);
            if( !email || !password)
                {
                    setLoading(false);
                     Alert.alert("Please fill all the details");
                     return;
                }
                setLoading(false);
                const {data}= await axios.post("/OperatorLogin",{email,password});
                data.user.password="";
                setState(data);
              alert(data.message);  
              await AsyncStorage.setItem("@auth",JSON.stringify(data));
              console.log("Operator Logged in is ",{email,password});
             navigation.navigate("Home");
        } catch (error) {
            alert(error.response.data.message);
            setLoading(false);
            console.log(error);
        }
    }

    return (
    <View style={styles.container}> 
      <Text style={styles.pageTitle}>Login</Text>
      <View>
      <InputBox inputTitle="Email" keyboardType="email-address"
       autoComplete="email" value={email} setValue={setEmail}/>
      <InputBox inputTitle="Password" secureTextEntry={true}
       autoComplete="password" value={password} setValue={setPassword}/>
    </View>
    {/* <Text>{JSON.stringify({name,email,password},null,4)}</Text> */}
    <SubmitButton btntitle="ADMIN Login" loading={loading} handleSubmit={handleSubmitAdmin}/>
    <SubmitButton btntitle="OPERATOR Login" loading={loading} handleSubmit={handleSubmitOperator}/>
    <Text style={styles.lineText}>
        New User Please <Text style={styles.link} 
        onPress={()=>navigation.navigate("Register")}
        >Register</Text>
    </Text>
    
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        backgroundColor:"#e1d5c9",
    },
    pageTitle:{
        fontSize:40,
        fontWeight:"bold",
        textAlign:"center",
        color:"#1e2225",
    },
    lineText:{
        textAlign:"center"
    },
    link:{
        color:"blue"
    }
   
});
export default Login