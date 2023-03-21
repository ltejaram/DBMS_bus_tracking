import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { Pressable } from 'react-native';
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
export default function Home({navigation}) {
  const [from_loc,set_from_loc]=useState("");
  const [to_loc,set_to_loc]=useState("");
  const [servie_no,set_service_no]=useState(0);
  function from_loc_handle(x)
  {
    set_from_loc(x.toLowerCase());
  }
  function to_loc_handle(x)
  {
    set_to_loc(x.toLowerCase());
  }
  let i=0;
 async function gather_info()
  {
    
    opendb().then(db=>
      db.transaction((tx)=>{
        tx.executeSql(
          "SELECT * FROM bus WHERE from_loc=? AND to_loc=?",[from_loc,to_loc],
          (tx,res)=>{
            let results=[];
            let len=res.rows.length;
            if(len>0)
            {
              for(let i=0;i<res.rows.length;i++)
              {
                  let row=res.rows.item(i);
                  let k=[row.bus_id,row.bus_name,row.start_hour,row.start_min,row.end_hour,row.end_min,row.from_loc,row.to_loc];
                  results.push(k);
              }
            }
            let arr=results;
            i++;
            console.log(i+" "+arr+" hi");
            navigation.navigate('bus_info',{arr1:arr});
          },
          error=>{
            console.log("oops! there was an error "+error);
          }
        )
      })) 
    return true;
  }

async function tracking()
  {
    opendb().then(db=>
      db.transaction((tx)=>{
        tx.executeSql(
          "SELECT DISTINCT from_loc as loc,start_hour as hr,start_min as min FROM bus WHERE bus_id=? UNION SELECT DISTINCT to_loc as loc,end_hour as hr,end_min as min FROM bus where bus_id=? ORDER BY hr",
          [servie_no,servie_no],
          (tx,res)=>{
            let results=[];
            let len=res.rows.length;
            if(len>0)
            {
              for(let i=0;i<res.rows.length;i++)
              {
                  let row=res.rows.item(i);
                  let k=[row.loc,row.hr,row.min];
                  results.push(k);
              }
            }
            let arr=results;
            i++;
           // console.log(i+" "+arr+" hi");
            
            
            navigation.navigate('bus_info2',{arr:results,serviceno:servie_no});
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
      <StatusBar barStyle = "dark-content" hidden={true} />
       <Text style={styles.heading} >Bus Tracking</Text>
      <TextInput style={styles.inputboxstyle} placeholder='From Location' onChangeText={from_loc_handle}></TextInput>
      <TextInput style={styles.inputboxstyle} placeholder='To Location' onChangeText={to_loc_handle}></TextInput>
      <Button title='search' onPress={gather_info}></Button>
      <Text style={{marginTop:50}}></Text>
      <TextInput style={styles.inputboxstyle} keyboardType='number-pad' placeholder='Service Number' onChangeText={(x)=>{
      set_service_no(x)
      }}></TextInput> 
      <Button title='track' onPress={tracking} ></Button> 
      <Pressable onPress={()=>{
        navigation.navigate('Login')
      }}>
        <Text style={{color:"#0044ff",fontSize:25,marginTop:300}}>Log Out</Text>
      </Pressable>
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

// gather_info();
//         if(arr.length!=0)
//         {
          
//           console.log("array has length");
//           navigation.navigate('search_box',{arr1:arr});
//         }
//         else
//         {
//           console.log("empty array");
//           gather_info();
//         }
        
