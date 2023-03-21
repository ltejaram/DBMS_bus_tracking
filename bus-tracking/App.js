/*
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as TaskManager from "expo-task-manager";
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
const LOCATION_TASK_NAME = "background-location-task";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      error: '',
    };
  }

  _getLocationAsync = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      enableHighAccuracy: true,
      distanceInterval: 1,
      timeInterval: 50
    });
    // watchPositionAsync Return Lat & Long on Position Change
    this.location = await Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        distanceInterval: 1,
        timeInterval: 10000
      },
      newLocation => {
        let { coords } = newLocation;
        console.log(coords);
        let region = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.045,
          longitudeDelta: 0.045
        };
        this.setState({ region: region });
      },
      error => console.log(error)
    );
    return this.location;
  };

  async componentWillMount() {
    // Asking for device location permission
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === "granted") {
      this._getLocationAsync();
    } else {
      this.setState({ error: "Locations services needed" });
    }
    userId = (await AsyncStorage.getItem("userId")) || "none";
    userName = (await AsyncStorage.getItem("userName")) || "none";
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.region}
          showsCompass={true}
          showsUserLocation={true}
          rotateEnabled={true}
          ref={map => {
            this.map = map;
          }}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.log(error +" hi ihuygtfgh");
    return;
  }
  if (data) {
    const { locations } = data;
    let lat = locations[0].coords.latitude;
    let long = locations[0].coords.longitude;
    userId = (await AsyncStorage.getItem("userId")) || "none";

    // Storing Received Lat & Long to DB by logged In User Id
    axios({
      method: "POST",
      url: "http://000.000.0.000/phpServer/ajax.php",
      data: {
        action: "saveLocation",
        userId: userId,
        lat,
        long
      }
    });
    // console.log("Received new locations for user = ", userId, locations);
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin:20
  }
});
*/

import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import Login from './screens/login';
import Home from './screens/home';
import Cardinfo from './screens/bus_info';
import UserResgistration from './screens/register';
const Stack=createNativeStackNavigator();
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import Bus_info2 from './screens/bus_info2';
import Livemap from './screens/map'
async function opendb()
{
  if(!(await FileSystem.getInfoAsync(FileSystem.documentDirectory+"SQLite")).exists){
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory+"SQLite");
  }
  await FileSystem.downloadAsync(
    Asset.fromModule(require("./assets/database/sqlite.db")).uri,
    FileSystem.documentDirectory+"SQLite/sqlite.db"
  );
  return SQLite.openDatabase("sqlite.db");
}
export default function App() {
  
useEffect(()=>{
  // const d=new Date();
  // console.log(d);
  // console.log(d.getHours());
  // console.log(d.getMinutes());
  opendb().then(db=>
    db.transaction((tx)=>{
      tx.executeSql(
        "SELECT * FROM bus",[],
        (tx,res)=>{
          console.log("sucess");
          console.log(res.rows);
        },
        error=>{
          console.log("oops! there was an error "+error);
        }
      )
    }))
},[]);
 /* return (
    <Livemap></Livemap>
  );*/
  return (
  <NavigationContainer>
  <Stack.Navigator screenOptions={{headerShown:false}}>
  
  <Stack.Screen
    name ="Login"
    component={Login}
    />
    <Stack.Screen
    name ="Register"
    component={UserResgistration}
    />
    <Stack.Screen
    name="Home"
    component={Home}
    />
    <Stack.Screen
      name="bus_info"
      component={Cardinfo}
    />
    <Stack.Screen
      name="bus_info2"
      component={Bus_info2}
    />
    <Stack.Screen
      name="map_info"
      component={Livemap}
    />
    </Stack.Navigator>
  </NavigationContainer>
  ); 

}

/*import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
        initialRegion={{
            latitude:11.320818069028656,
            longitude:75.93531690077,
            latitudeDelta:0.09,
            longitudeDelta:0.0421
          }}
      />
      <Marker coordinate={{
            latitude:11.320818069028656,
            longitude:75.93531690077,
            latitudeDelta:0.09,
            longitudeDelta:0.0421
          }}></Marker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});*/

