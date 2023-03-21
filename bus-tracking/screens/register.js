import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

export default function UserResgistration({navigation}) {
  const [statement,statementhandle]=useState("");
  
  const [name,setname]=useState('');
  const [email,setemail]=useState('');
  const [phonono,setphoneno]=useState('');
  const [password,setpassword]=useState('');
  let dataobject={};
  function signup()
  {
    if(name==""||email==""|| phonono==""||password=="" )
    {
      statementhandle("all fields are required ")
    }
    else if(password.length<4)
    {
      statementhandle("password should be more than 4 digits");
    }
    else{
     // userinsert();
        dataobject={
          name:name,
          email:email,
          phonono:phonono,
          password:password
        }
        userinsert();
    }
  }
  
  /*_retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('arr');
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
      console.log("sorry i havent got data");
    }
  };*/
  async function userinsert()
  {
    let arr1=[];
    let arr=await AsyncStorage.getItem('arr');
    console.log("printing arr "+arr);
    if(!arr)
    {
      console.log("in null statement");
        arr1.push(dataobject); 
        AsyncStorage.setItem("arr",JSON.stringify(arr1));
        navigation.navigate('Login')
    }
    else
    {
      let k=0;
      console.log(arr+" array");
      console.log(arr[0]["email"]);
      let temp =JSON.parse(arr);
      for(let i=0;i<temp.length;i++)
      {
          if(temp[i]["email"]==email)
          {
            statementhandle("email already existed");
            console.log("email already existed");
           // console.log(statement);
            k=1;
          } 
      }
      if(k==0)
      {
        
        temp.push(dataobject);
        AsyncStorage.setItem("arr", JSON.stringify(temp));
        navigation.navigate('Login')
      }
    }
    
  AsyncStorage.getItem('arr',(err,result)=>{
    console.log(result)
  })

  }
  
  
  
  // Console log result:
  // => {'name':'Chris','age':31,'traits':
  //    {'shoe_size':10,'hair':'brown','eyes':'blue'}}
  return (
    <View style={styles.appcontainer}>
    <Text style={styles.heading} >Bus Tracking</Text>
      <StatusBar barStyle = "dark-content" hidden={true} />
      
      <TextInput style={styles.inputboxstyle} placeholder='name' onChangeText={(x)=>{
        setname(x)
      }}></TextInput>
      <TextInput style={styles.inputboxstyle} placeholder='email' onChangeText={(x)=>{
        setemail(x)
      }}></TextInput>
      <TextInput style={styles.inputboxstyle} placeholder='phone number' maxLength={10} keyboardType='numeric' onChangeText={(x)=>{
        setphoneno(x)
      }}></TextInput>
      
      <TextInput style={styles.inputboxstyle} secureTextEntry={true}  placeholder='Password' onChangeText={(x)=>{
        setpassword(x)
      }}></TextInput>
      
      <Text style={{fontSize:25,color:"red"}}>{statement}</Text>
      <Button title='submit' onPress={()=>{
            signup();
      }}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
    heading:
    {
      fontSize:50,
      color:"#0044ff",
      marginBottom:50,
      position:"relative",
      backgroundColor:"#C0C0C0",
      width:"100%",
      paddingLeft:50
    },
  appcontainer:{
    
    marginBottom:10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputboxstyle:
  {
    paddingLeft:10,
    fontSize:30,
    height:50,
    width:280,
    borderColor:"black",
    borderWidth:4,
    borderRadius:6,
    margin:2
  }
});
