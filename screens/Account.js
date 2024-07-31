import { View, Text,StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React ,{useContext,useState} from 'react'
import { AuthContext } from '../context/authContext'
import FooterMenu from '../components/Menus/FooterMenu';
import axios from "axios"
const Account = () => {
    // Getting the global state
    const [state,setState]=useContext(AuthContext);
    const {user,token}=state;

    const[name,setName]=useState(user?.name);
    const[email,setEmail]=useState(user?.email);
    const [password,setPassword]=useState(user?.password);
    const[loading,setLoading]=useState(false);
    

    const handleUpdate=async()=>{
      try 
      {
        setLoading(true);
       const {data}= await axios.put("/updateOperatorDetails",{
          name,email,password
        });
        setLoading(false);
        let UD=JSON.stringify(data);
        setState({...state,user:UD.data});
        alert(data.message);
      } 
      catch (error) {
        alert("Some problem occured please retry");
        setLoading(false);
        console.log(error);
      }
    }
  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={{alignItems:"center"}}>
        <Image
        source={{
          uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s"
        }}
        style={{
          height:200,
          width:200
        }}
        />
      </View>
      <Text style={styles.warning}>
        You can only update password
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Name</Text>
        <TextInput
        style={styles.inputBox}
        value={name}
        onChangeText={(text)=>setName(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Email</Text>
        <TextInput
        style={styles.inputBox}
        value={email}
        editable={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Password</Text>
        <TextInput
        style={styles.inputBox}
        value={password}
        onChangeText={(text)=>setPassword(text)}
        secureTextEntry={true}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Role</Text>
        <TextInput
        style={styles.inputBox}
        value={state?.user.role}
        editable={false}
        />
      </View>

        <View style={{alignItems:"center"}}>
      <TouchableOpacity 
      style={styles.updateBtn}
      onPress={handleUpdate}
      >
        <Text style={styles.updateBtnText}>{loading==true?"Please Wait...":"Update Profile"}</Text>
      </TouchableOpacity>
      </View>
      </ScrollView>
      {/* <Text>NAME:{state?.user.name}</Text>
      <Text>EMAIL:{state?.user.email}</Text>
      <Text>ROLE:{state?.user.role}</Text> */}
      {/* <Text>{start}</Text> */}
      <View style={{flex:1,justifyContent:"flex-end"}}>
      <FooterMenu/>
     </View>
    </View>
  )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        margin:10,
        marginTop:40,
        justifyContent:"space-between",
    },
    warning:{
      fontSize:14,
      color:"red",
      textAlign:"center",
    },
    inputContainer:{
      marginTop:20,
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center"
    },
    inputText:{
      fontWeight:"bold",
      width:70,
      color:"gray"
    },
    inputBox:{
      width:250,
      fontSize:16,
      backgroundColor:"#ffffff",
      marginLeft:10,
      paddingLeft:20,
      borderRadius:10,
    },
    updateBtn:{
      backgroundColor:"black",
      marginTop:30,
      height:40,
      width:250,
      justifyContent:"center",
      alignItems:"center",
      borderRadius:20,
    },
    updateBtnText:{
      color:"#ffffff",
      fontSize:20,
      fontWeight:"bold"
    }
  });
export default Account