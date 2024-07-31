import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import RootNavigation from './Navigation';

export default function App() {
  const Stack=createNativeStackNavigator();
  return (
   <NavigationContainer>
    {/* <AuthProvider>
    <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Home" component={Home} options={{headerShown:true}}/>
      <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
    </Stack.Navigator>
    </AuthProvider> */}
    <RootNavigation/>
   </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
