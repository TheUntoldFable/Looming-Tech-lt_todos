import React, { FunctionComponent, ReactNode, useContext } from "react";
import { Alert, StyleSheet,Text } from "react-native";
import { ThemeContext } from "../utils/ThemeManager";

type TextProps = {
 children: ReactNode,
 textSize?: 'regular' | 'big' | 'small' | 'xl',
 customStyle?: Object,
}

export const TextComponent:FunctionComponent<TextProps> = ({
 children,
 textSize,
 customStyle,
}) => {
 
const { themeColor } = useContext(ThemeContext);

 let size = {}; 

 switch (textSize) {
  case 'regular':
   size = styles.regular
    break
  case 'big':
   size = styles.big
    break
    case 'xl':
      size = styles.xl
       break
  case 'small':
   size = styles.small
    break
  default:
   size = styles.regular
    break
}

 return <Text style={[styles.text, size, styles[`theme${themeColor}`],customStyle]}>{children}</Text>
}

const styles = StyleSheet.create({
 text: {
  fontFamily: 'PlayFair',
 },
 regular: {
   fontSize: 16,
 },
 xl:{
   fontSize:24,
 },
 big : {
   fontSize: 20,
 },
 small: {
   fontSize: 12,
 },
 themeDark: {
   color: '#E8EAED',
 },
 themeLight:{
   color: '#121212',
 }
});