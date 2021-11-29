import React, { useState,memo } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import AppNavigator from './navigation/AppNavigator';

const loadFont = () => {
  return Font.loadAsync({
    "Lato": require('./assets/fonts/Lato.ttf'),
    "PlayFair": require('./assets/fonts/PlayFair.ttf')
  })
}


 function App() {
 const [fontIsLoaded, setFontIsLoaded] = useState<Boolean>(false);

 if(!fontIsLoaded) {
   return <AppLoading 
   startAsync={loadFont} 
   onFinish={()=> setFontIsLoaded(true)}
   onError={()=> console.log('error')}
   />
 }

  return (
      <AppNavigator/>
  );
}

export default memo(App);

