import { StyleSheet, Text, View } from 'react-native';
import Register from "../../screens/auth/Register"
import Login from "../../screens/auth/Login";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { AuthProvider } from '../../context/authContext';
import Home from "../../screens/Home";
import React,{useContext} from 'react'
import { AuthContext } from '../../context/authContext';
import HeaderMenu from './HeaderMenu';
import Post from '../../screens/Post';
import About from '../../screens/About';
import Account from '../../screens/Account';
const ScreenMenu = () => {
    const Stack=createNativeStackNavigator();
    
    // Accessing the global state having details of logged in user
    const [state]=useContext(AuthContext);
    var authenticatedUser;
    if(state.user && state.token)
        {
            authenticatedUser=true;
        }
        else
        {
            authenticatedUser=false;
        }

  return (
    <Stack.Navigator initialRouteName="Login">
        {authenticatedUser?
        (
        <>    
            <Stack.Screen name="Home" component={Home} options={{
            headerShown:true,
            title:"Full Stack App",
            headerRight:()=><HeaderMenu/>,
            }}/>

            <Stack.Screen name="Post" component={Post}
             options={{
            headerBackTitle:"Back",
            headerRight:()=><HeaderMenu/>,
            }}/>

            <Stack.Screen name="About" component={About}
             options={{
            headerBackTitle:"Back",
            headerRight:()=><HeaderMenu/>,
            }}/>

            <Stack.Screen name="Account" component={Account}
             options={{
            headerBackTitle:"Back",
            headerRight:()=><HeaderMenu/>,
            }}/>
    </>
    )  
        :
        (<>
        <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        </>) }
   
    </Stack.Navigator>
  )
}

export default ScreenMenu