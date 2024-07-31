import { View, Text ,StyleSheet, TextInput, Alert} from 'react-native'
import React,{useState} from 'react'
import InputBox from '../../components/Forms/InputBox'
import SubmitButton from '../../components/Forms/SubmitButton';
import axios from "axios";
const Register = ({navigation}) => {
    // Making states
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const[loading,setLoading]=useState(false);

    // function
    const handleSubmitAdmin=async ()=>{
        try {
            setLoading(true);
            if(!name || !email || !password)
                {
                    setLoading(false);
                     Alert.alert("Please fill all the details");
                     return;
                }
                setLoading(false);
              const {data}= await axios.post("/createAdmin",{name,email,password});
              alert(data.message);  
                navigation.navigate("Login");
              console.log("Register Details ===>",{name,email,password});
        } catch (error) {
            alert(error.response.data.message);
            setLoading(false);
            console.log(error);
        }
    }

    const handleSubmitOperator=async()=>{
        try {
            setLoading(true);
            if(!name || !email || !password)
                {
                    setLoading(false);
                     Alert.alert("Please fill all the details");
                     return;
                }
                setLoading(false);
                const {data}= await axios.post("/createOperator",{name,email,password});
              alert(data.message);
              navigation.navigate("Login");
                console.log("Register Details ===>",{name,email,password});
        } catch (error) {
            alert(error.response.data.message);
            setLoading(false);
            console.log(error);
        }
    }

    return (
    <View style={styles.container}> 
      <Text style={styles.pageTitle}>Register</Text>
      <View>
      <InputBox inputTitle="Name" value={name} setValue={setName} />
      <InputBox inputTitle="Email" keyboardType="email-address"
       autoComplete="email" value={email} setValue={setEmail}/>
      <InputBox inputTitle="Password" secureTextEntry={true}
       autoComplete="password" value={password} setValue={setPassword}/>
    </View>
    {/* <Text>{JSON.stringify({name,email,password},null,4)}</Text> */}
    <SubmitButton btntitle="Register As ADMIN" loading={loading} handleSubmit={handleSubmitAdmin}/>
    <SubmitButton btntitle="Register As OPERATOR" loading={loading} handleSubmit={handleSubmitOperator}/>
    <Text style={styles.lineText}>
        Already Registered Please <Text style={styles.link}
        onPress={()=>navigation.navigate("Login")}
        >LOGIN</Text>
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
export default Register