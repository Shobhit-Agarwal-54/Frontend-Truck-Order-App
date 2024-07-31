import { View, Text ,StyleSheet,TextInput} from 'react-native'
import React from 'react'

const PostTextAndBox = (
    {title,
    search,
    setSearch,
    handleSearch,
    setShow}
) => 
    
    {
    return (
    <View>
    <Text style={styles.textHeading}>{title}</Text>
    <TextInput 
      style={styles.inputBox}
      placeholder={title}
      placeholderTextColor="blue"
      value={search}
      clearButtonMode='always'
      onTouchStart={()=>setShow(true)}
      onChangeText={(text)=>{
        setSearch(text);
        handleSearch(text);
      }}
    />
    </View>
  )
}

const styles=StyleSheet.create({
    inputBox:{
      backgroundColor:"#ffffff",
      width:"99%",
      marginTop:10,
      fontSize:25,
      fontWeight:"bold",
      paddingLeft:15,
      borderColor:"#8e8e8e",
      borderWidth:0.5,
      borderRadius:10,
      height:50,
      color:"blue"
    },
    textHeading:{
      fontSize:25,
      fontWeight:"bold",
    },
    textName:{
      fontSize:14,
      marginLeft:10,
      fontWeight:"600"
    }
  });
export default PostTextAndBox