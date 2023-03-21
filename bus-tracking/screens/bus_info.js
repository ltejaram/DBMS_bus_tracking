import { Card } from '@rneui/themed';
import React from 'react'
import { Button, StyleSheet, Text, TextInput, View,ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
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
function Cardinfo({route,navigation})
{
    async function tracking(servie_no)
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
            
            //console.log(i+" "+arr+" hi");
            navigation.navigate('bus_info2',{arr:results,serviceno:servie_no});
          },
          error=>{
            console.log("oops! there was an error "+error);
          }
        )
      })) 
    return true;
    }

    const {arr1}=route.params;
    if(arr1.length==0)
    {
        return (<View style={{alignItems:"center" ,justifyContent:"center"}}>
         <Text style={{marginTop:200,fontSize:30,color:"red"}}>Sorry No Busses Found :(</Text>
         </View>);
    }
    else
    {
    return (
    
    <ScrollView style={styles.scrollView} >
    {
    arr1.map((x)=>{
    return (
        <View style={styles.container}>
        <Card containerStyle={{width:"100%"}}>
            <Card.Title style={styles.textstyle1}>service number: {x[0]}</Card.Title>
            <Card.Divider></Card.Divider>
            {/* <Text style={styles.textstyle}>
            <Text>Source: {x[6]}{"\t"}{x[2]}:00</Text>
            <Text>{"\n"}Destination: {x[7]}{"\t"}{x[4]}:00</Text>
            </Text> */}
            <View>
            <DataTable >          
                <DataTable.Row >
                    <DataTable.Cell style={styles.datatable}>{x[6]}</DataTable.Cell>
                    
                    <DataTable.Cell></DataTable.Cell>
                    <DataTable.Cell></DataTable.Cell>
                    <DataTable.Cell>{x[7]}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>   
                    <DataTable.Cell>{x[2]}:{(x[3]>=10)?x[3]:"0"+x[3]}</DataTable.Cell>
                
                    <DataTable.Cell></DataTable.Cell>
                    <DataTable.Cell></DataTable.Cell>
                    <DataTable.Cell>{x[4]}:{(x[5]>=10)?x[5]:"0"+x[5]}</DataTable.Cell>
                </DataTable.Row>
            </DataTable>
            {/*<Text style={styles.textstyle}>Current location: {null}</Text>*/}
            <Button title='More Info' onPress={()=>{tracking(x[0])}}></Button>
            </View>
        </Card>
        </View> 
    );
    })
    }
    </ScrollView>
    
);   
}
}
export default Cardinfo;
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
        color:"red"
      }

})