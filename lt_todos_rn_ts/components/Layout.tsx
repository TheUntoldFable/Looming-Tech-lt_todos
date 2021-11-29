import React,{ReactNode, useContext} from 'react'
import { StyleSheet,View,Text } from 'react-native';
import { ThemeContext } from '../utils/ThemeManager';

interface Props {
 children: ReactNode,
 style: Object
}


export default ({ children,style }: Props) => {

 const {themeColor} = useContext(ThemeContext);

 return (
  <View style={[styles.container,styles[`layout${themeColor}Background`],style]}>
   {children}
  </View>
 )
}


const styles = StyleSheet.create({
 container: {
   flex: 1,
 },
 layoutLightBackground: {
   backgroundColor: '#E8EAED',
 },
 layoutDarkBackground: {
  backgroundColor: '#121212',
}
});


