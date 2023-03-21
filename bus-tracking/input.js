import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Inputhandle() {
    const [from_loc,set_from_loc]=useState('');
    const [to_loc,set_to_loc]=useState('');
    
    return (
    
      <View style={styles.appcontainer}>
        <StatusBar barStyle = "dark-content" hidden={true} />
        <Text style={styles.heading} >Input</Text>
        <TextInput style={styles.inputboxstyle} placeholder='From Location'></TextInput>
        <TextInput style={styles.inputboxstyle} placeholder='To Location'></TextInput>
        <TextInput style={styles.inputboxstyle} keyboardType='number-pad' placeholder='bus id'></TextInput>
        <TextInput style={styles.inputboxstyle} keyboardType='number-pad' placeholder='start hour'></TextInput>
        <TextInput style={styles.inputboxstyle} keyboardType='number-pad' placeholder='end hour'></TextInput>
        <TextInput style={styles.inputboxstyle} keyboardType='number-pad' placeholder='start min'></TextInput>
        <TextInput style={styles.inputboxstyle} keyboardType='number-pad' placeholder='end min'></TextInput>
        <Button title='search'></Button>
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
  