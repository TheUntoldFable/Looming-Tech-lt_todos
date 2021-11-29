import React,{
  FunctionComponent,
  ReactElement,
  useContext,
} from 'react'
import {
  StyleSheet,
   TouchableOpacity,
   View,
} from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { ThemeContext, ThemeProvider } from '../utils/ThemeManager';
import { LanguageProvider, LanguageContext } from '../utils/LanguageManager';

import All  from '../screens/All';
import  Urgent from '../screens/Urgent';

import { TextComponent } from '../components/TextComponent';

import 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const AppNavigator: FunctionComponent = () => {

  const {toggleTheme, themeColor} = useContext(ThemeContext);
  const { userLanguage, userLanguageChange,dictionary } = useContext(LanguageContext) 


 const ToggleButtons = (): ReactElement => {
  const {toggleTheme, themeColor} = useContext(ThemeContext);
  const { userLanguage, userLanguageChange,dictionary } = useContext(LanguageContext) 

  const handleLanguageChange = (): void => {
    if(userLanguage === 'en') {
     userLanguageChange('bg')
    } else {
     userLanguageChange('en')
    }
  }
  return (
    <View style={{flexDirection:'row'}}>
    <TouchableOpacity 
     style={styles[`button${themeColor}`]} 
     onPress={()=>toggleTheme()}>
      <TextComponent customStyle={styles.buttonText}>
        {themeColor}
      </TextComponent>
    </TouchableOpacity>
      <TouchableOpacity 
      style={styles[`button${themeColor}`]} 
       onPress={()=> handleLanguageChange()}>
      <TextComponent customStyle={styles.buttonText}>
          {userLanguage.toUpperCase()}
        </TextComponent>
      </TouchableOpacity>
      </View>
  )
 }
 
 return (
   <LanguageProvider>
    <ThemeProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName={dictionary.headerAll} >
          <Stack.Screen 
            options={{
              drawerActiveBackgroundColor:'#121212',
              drawerActiveTintColor:'#E8EAED',
              drawerInactiveTintColor: '#121212',
              drawerInactiveBackgroundColor: '#E8EAED',
              drawerLabelStyle:{
                fontFamily: 'PlayFair',
              },
              headerTitleStyle:{
                fontFamily: 'PlayFair',
              },
              headerStyle:{
                borderBottomEndRadius: 20,
                borderBottomStartRadius: 20,
              },
               headerRight: () => (<ToggleButtons/>)
               }} 
            name={dictionary.headerAll}
            component={All}/>
            <Stack.Screen 
            options={{
              drawerActiveBackgroundColor:'#121212',
              drawerActiveTintColor:'#E8EAED',
              drawerInactiveTintColor: '#121212',
              drawerInactiveBackgroundColor: '#E8EAED',
      
       
              drawerLabelStyle:{
                fontFamily: 'PlayFair',
              },
              headerTitleStyle:{
                fontFamily: 'PlayFair',
              },
              headerStyle:{
                borderBottomEndRadius: 20,
                borderBottomStartRadius: 20,
              },
               headerRight: () => (<ToggleButtons/>)
            }} 
            name={dictionary.headerUrgent}
            component={Urgent}/>
        </Drawer.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  </LanguageProvider>
 )
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',
 },
 buttonText: {
   lineHeight: 19,
 },
 drawerDark: {
   backgroundColor: '#121212',
 },
 drawerLight: {
  backgroundColor:'red'
 },
 buttonDark: {
   alignItems: 'center',
   justifyContent:'center',
   width: 50,
   height: 30,
   borderRadius:40,
   backgroundColor: '#121212',
   marginRight: 10,
   textAlign:'center',
 },
 buttonLight: {
  alignItems: 'center',
  justifyContent:'center',
  width: 50,
  height: 30,
  borderRadius:40,
  backgroundColor: '#fff',
  marginRight: 10,
},
 text: {
   fontFamily: 'Lato',
 }
});

export default AppNavigator;
