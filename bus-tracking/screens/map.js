import React from 'react'
import { View,Text } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Livemap({route,navigation})
{
  const {serviceid}=route.params;
  
let arr=[
  'https://www.google.com/maps/@16.5312506,81.4668875,15z/data=!3m1!4b1!4m5!7m4!1m2!1s117872037051904867442!2sChY0OTBKTF9za2pQakFEUTFORUhRT3BREggHBfBg7ixE-g%3D%3D!2e2?hl=en',
  'https://www.google.com/maps/@16.5312506,81.4668875,15z/data=!3m1!4b1!4m5!7m4!1m2!1s117872037051904867442!2sChY0OTBKTF9za2pQakFEUTFORUhRT3BREggHBfBg7ixE-g%3D%3D!2e2?hl=en',
  'https://www.google.com/maps/@16.5311,81.4667301,15z/data=!3m1!4b1!4m5!7m4!1m2!1s107288435882241058442!2sChZzMUtBWEl3bnNCT2dkc3pJd05VNGdREggHBfBg_9SeZw%3D%3D!2e2?hl=en'
];
console.log(serviceid);
  return(
    <WebView
        source={{uri:arr[serviceid-1]}}
    />
  );
}