import { StatusBar } from 'expo-status-bar';
import { Pressable } from 'react-native';
import {  StyleSheet, Text, TextInput, View,Alert} from 'react-native';
import { Button } from '@rneui/themed';
import { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import AsyncStorage from '@react-native-async-storage/async-storage';
async function opendb()
{
    if(!(await FileSystem.getInfoAsync(FileSystem.documentDirectory+"SQLite")).exists){
      await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory+"SQLite");
    }
    await FileSystem.downloadAsync(
      Asset.fromModule(require("../assets/database/sqlite.db")).uri,
      FileSystem.documentDirectory+"SQLite/sqlite.db"
    );
    return SQLite.openDatabase("sqlite.db");
}

export default function Login({navigation}) {
  
 // AsyncStorage.removeItem("arr");
  //console.log(name);
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const [error_statement,statementhandle]=useState('');
  //statementhandle("");
 function loginhandle()
 {
  if(email=="" || password=="" )
  {
    //Alert.alert("all fields are required");
    statementhandle("all fields are required")
  }
  else
  {
    checker();
  }
 }
 async function checker()
    {
      let x=email.toLowerCase();
    opendb().then(db=>
      db.transaction( (tx)=>{
        tx.executeSql(
          "SELECT * FROM user where email=? and password=?",
          [email,password],
          async (tx,res)=>{
            let len=res.rows.length;
            if(len>0)
            {
              //navigation.navigate('Home');
              navigation.replace('Home');
            }
            else{
              //Alert.alert("incorrect username or password");
              let arr=await AsyncStorage.getItem('arr')
              if(!arr)
              {
                
              statementhandle("incorrect username or password");
              }
              else
              {
              let temp=JSON.parse(arr);
              for(let i=0;i<temp.length;i++)
              {
                if(temp[i]["email"]==email && temp[i]["password"]==password)
                {
                  navigation.replace('Home');
                }
              }
            } 
              statementhandle("incorrect username or password");
            }
          },
          error=>{
            console.log("oops! there was an error "+error);
          }
        )
      })) 
    return true;
    }
  return (
    <View style={styles.appcontainer}>
    <Text style={styles.heading} >Bus Tracking</Text>
      <StatusBar barStyle = "dark-content" hidden={true}  />
      <TextInput style={styles.inputboxstyle} placeholder='Email' onChangeText={(x)=>{
        setemail(x)
      }}></TextInput>
      <TextInput style={styles.inputboxstyle} secureTextEntry={true}  placeholder='Password' onChangeText={(x)=>{
        setpassword(x)
      }}></TextInput>
      <TextInput style={{color:"red" ,fontSize:25}}>{error_statement}</TextInput>
      <Button title='login' containerStyle={styles.buttonstyle} onPress={()=>{
        loginhandle()
       // navigation.replace('Home');
        //navigation.navigate('Home');
        
      }}/>  
      <Button title='sign up' containerStyle={styles.buttonstyle} onPress={()=>{
        navigation.navigate('Register');
      }}/>
      
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
    width:"100%",
    borderColor:"black",
    borderWidth:4,
    borderRadius:6,
    margin:2
  },
  buttonstyle:{
    width:"80%",
    marginBottom:10,
    borderRadius:100,
    backgroundColor:"blue"
  }
});
