import { View, Text,StyleSheet,TextInput } from 'react-native'
import React from 'react'

const inputBox = ({
    inputTitle,
    keyboardType,
    autoComplete,
    secureTextEntry=false,
    value,
    setValue}
    ) => {
  return (
    <View style={{marginHorizontal:20}}>
        <Text>{inputTitle}</Text>
        <TextInput 
        style={styles.inputBox}
        autoCorrect={false}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={(text)=>setValue(text)}
        />
      </View>
  )
}

const styles=StyleSheet.create({
    inputBox:{
        height:40,
        marginBottom:20,
        backgroundColor:"#ffffff",
        marginTop:10,
        borderRadius:10,
        paddingLeft:10,
    }
});
export default inputBox