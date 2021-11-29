import React,{
    FunctionComponent,
    memo,
    ReactElement,
    useContext,
    useEffect, 
    useState,
    
} from 'react'

import { 
 View,
 StyleSheet, 
 Animated,
 TouchableOpacity,
 Alert
} from 'react-native'
import { LanguageContext } from '../utils/LanguageManager'

import { TextComponent } from './TextComponent'

interface TodoProps {
    date: any,
    title: string,
    description: string,
    status?: Boolean,
    customStyle?: Object
}

const Todo: FunctionComponent<TodoProps> = ({
    date,
    title,
    description,
    status,
    customStyle
}): ReactElement => {

const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(0))
const { updateTodo } = useContext(LanguageContext)

useEffect(() => {
    Animated.loop(
        Animated.sequence([
            Animated.timing(fadeAnimation,{
                toValue:0,
                duration: 900,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnimation, {
                toValue:1,
                duration: 900,
                useNativeDriver: true,
            })
        ])
    ).start()
}, [fadeAnimation])

 let creationDate = new Date(date).toISOString().slice(0, 10);
 let isUrgent = status ? 'Urgent': 'NotUrgent'

const showAlert = (): void => {
    Alert.alert('Do you want to make this urgent?',`Your selection: ${title}`,
    [{text: "No",
    onPress: () => Alert.alert("Update Rejected"),
    style: "cancel"},
    {text: "Yes",
    onPress: () => {Alert.alert("Update Approved"); updateTodo(title)},
    style: "default"}])
}

 return (
  <TouchableOpacity 
  activeOpacity={0.95} 
  onPress={() => showAlert()} 
  style={[styles.container, styles[`container${isUrgent}`],customStyle]}>
    <View style={styles.topSide}>
      <TextComponent textSize="big" customStyle={styles.title}>{title}</TextComponent>
      <TextComponent customStyle={styles.description}>{description}</TextComponent>
    </View>
    <View style={styles.bottomSide}>
      <TextComponent customStyle={styles.date}>{creationDate}</TextComponent>
      <Animated.View style={[
          styles[`status${isUrgent}`], 
          {opacity: isUrgent === 'Urgent' ? fadeAnimation : 1},
          ]}></Animated.View>
    </View>
  </TouchableOpacity>
 )
}

export default memo(Todo)

const styles = StyleSheet.create({
 container: {   
  padding: 15,
  backgroundColor:'#fafafa',
  borderRadius: 10,
  elevation: 5,
  shadowColor: "#000",
  marginBottom: 10,
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.22,
shadowRadius: 2.22,
 },
 containerUrgent: {
    borderWidth: 2,
    borderColor: '#B80F0A',
    padding: 15,
    backgroundColor:'#fafafa',
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    marginBottom: 10,
  shadowOffset: {
      width: 0,
      height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
 },
 title: {
     textAlign: 'center',
     padding:10,
      color:'#121212',
 },
 text: {
     fontFamily:'Lato'
 },
 statusUrgent: {
     height:20,
     width:20,
     borderRadius: 20,
     backgroundColor: '#B80F0A',
 },
 statusNotUrgent: {
    height:20,
    width:20,
    borderRadius: 20,
    backgroundColor: '#AFE689',
},
 topSide: {
 },
 description: {
     color:'#121212',
     marginBottom: 20,
     flexWrap: 'wrap',
 },
 date: {
     color: '#121212',
 },
 bottomSide: {
     flexDirection: 'row',
     justifyContent:'space-between',
 },
})
