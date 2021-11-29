import React from 'react'
import { TextComponent } from './TextComponent';
import { Button, StyleSheet,View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const Header = () => {
 const navigation = useNavigation();

 return (
  <View style={styles.container}>
    <Button title="button" onPress={() =>  navigation.openDrawer()}/>
  </View>
 )
}

const styles = StyleSheet.create({
 container: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 40,
  backgroundColor:'blue',
  borderBottomStartRadius: 20,
  borderBottomEndRadius: 20,
 }
})
