import { Card } from '@rneui/themed';
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View,ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { WebView } from 'react-native-webview';

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
export default function Bus_info2({route,navigation})
{
    const {arr,serviceno}=route.params;

    let driver_details=[];
    async function driver_info()
    {
    opendb().then(db=>
      db.transaction((tx)=>{
        tx.executeSql(
          "SELECT name,driver_id,phonenno FROM driver inner JOIN phoneno ON driver.driver_id=phoneno.id WHERE bus_id=?",
          [serviceno],
          (tx,res)=>{
            let results=[];
            let len=res.rows.length;
            //console.log(res.rows)
            if(len>0)
            {
              let row=res.rows.item(0);
              driver_details.push(row.driver_id);
              driver_details.push(row.name);
              driver_details.push(row.phonenno);
            }
            //console.log(driver_details+" hi all")
            setid(driver_details[0]);
            setname(driver_details[1]);
            setphno(driver_details[2]);
          },
          error=>{
            console.log("oops! there was an error "+error);
          }
        )
      }
      )) 
    }
    
    const d=new Date();
    // console.log(d);
    // console.log(d.getHours());
    // console.log(d.getMinutes());
    let time1=new Map();
    let time_hr=[];
    arr.map((x)=>{
        time1.set(x[1],x[0]);
        time_hr.push(x[1]);
    })
    console.log(time1);
    console.log(time_hr);
    console.log(time1.get(8));
    let lowerBound = (A, T) => {
        let N = A.length,
            i = 0,
            j = N;
        while (i < j) {
            let k = Math.floor((i + j) / 2);
            if (A[k] < T)
                i = k + 1;
            else
                j = k;
        }
        return i;
    };
    let next=lowerBound(time_hr,d.getHours());
    let before=next-1;
    console.log(time1.get(time_hr[next])+" "+next);
    console.log(time1.get(time_hr[before])+" "+before);
    let statement="";
    function loc_statement()
    {
        if(time_hr[next]==d.getHours())
        {
            statement="The bus is at "+time1.get(time_hr[next])

        }
        else if(before==-1)
        {
            statement="The bus haven't started from source " +time1.get(time_hr[next]);
        }
        else if(next>=time_hr.length)
        {
            statement="The bus arrived at destination "+time1.get(time_hr[before]) +". it arrived destination exactly "+(d.getHours()-time_hr[before])+" hour(s) "+d.getMinutes()+" minute(s) back " ;
        }
        else{
            statement= "The bus has left "+time1.get(time_hr[before])+" the bus will be arriving shortly at "+time1.get(time_hr[next]) +" in "+ (time_hr[next]-d.getHours())+" hour(s) "+d.getMinutes()+" minute(s) ";
        }

        console.log(statement)
    }
    loc_statement();
    
    const [id,setid]=useState('');
    const [name,setname]=useState("");
    const [phno,setphno]=useState(0);
    if(arr.length==0)
    {
        return (<View style={{alignItems:"center" ,justifyContent:"center"}}>
         <Text style={{marginTop:200,fontSize:30,color:"red"}}>Sorry No Busses Found :(</Text>
         </View>);
    }
    else
    {
    driver_info();
    return (
        <ScrollView>
        {
        <View style={styles.container}>
        <Card containerStyle={{width:"100%"}}>
            <Card.Title style={styles.textstyle1}>service number: {serviceno} </Card.Title>
            <Card.Divider></Card.Divider>
            { arr.map((x)=>{
                return (
                <View>
                <DataTable>          
                    <DataTable.Row >
                        <DataTable.Cell >{x[0]}</DataTable.Cell>
                        <DataTable.Cell></DataTable.Cell>
                        <DataTable.Cell></DataTable.Cell>
                        <DataTable.Cell>{x[1]}:{(x[2]>=10)?x[2]:"0"+x[2]}</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
                </View>
                )
            })
            }
        <Text style={styles.textstyle1}>Driver Details:</Text>
        <Text style={styles.textstyle}>Driver Id: {id}</Text>
        <Text style={styles.textstyle}>Driver Name: {name}</Text>
        <Text style={styles.textstyle}>Driver Phone number: {phno}</Text>
        <Text style={styles.textstyle1}>current location:</Text>
        <Text style={styles.textstyle}>{statement}</Text>
        <Button title='live tracking' onPress={()=>{
            navigation.navigate('map_info',{serviceid:serviceno})
        }}/>
        </Card>
        </View>
        }
        </ScrollView>
    );   
    }}
const styles=StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center'
    },
    textstyle:{
        fontSize:20,
        
    },
    textstyle1:{
        fontSize:20,
        color:"red"
    },
    scrollView: {
        
        marginBottom:20,
      },
      datatable:{
        backgroundColor:"pink"
      }

})
 {/*
        <View style={styles.container}>
        <Card containerStyle={{width:"100%"}}>
            <Card.Title style={styles.textstyle1}>service number: {serviceno} </Card.Title>
            <Card.Divider></Card.Divider>
            { arr.map((x)=>{
                return (
                <View>
                <DataTable>          
                    <DataTable.Row >
                        <DataTable.Cell >{x[0]}</DataTable.Cell>
                        <DataTable.Cell></DataTable.Cell>
                        <DataTable.Cell></DataTable.Cell>
                        <DataTable.Cell>{x[1]}:{(x[2]>=10)?x[2]:"0"+x[2]}</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
                </View>
                )
            })
            }
        <Text style={styles.textstyle1}>Driver Details:</Text>
        <Text style={styles.textstyle}>Driver Id: {id}</Text>
        <Text style={styles.textstyle}>Driver Name: {name}</Text>
        <Text style={styles.textstyle}>Driver Phone number: {phno}</Text>
         <Text style={styles.textstyle1}>current location:</Text>
         <Text style={styles.textstyle}>{statement}</Text>
        
        </Card>
        </View>
        
    */}
   