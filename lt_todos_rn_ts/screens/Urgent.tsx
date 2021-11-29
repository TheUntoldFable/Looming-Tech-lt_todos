import React, { FunctionComponent,memo,useContext } from 'react'
import Layout from '../components/Layout'
import { 
 View,
 Text,
 StyleSheet, 
 ScrollView,
 Button
} from 'react-native'
import Todo from '../components/Todo'
import { ThemeContext } from '../utils/ThemeManager'
import { TextComponent } from '../components/TextComponent'
import { LanguageContext } from '../utils/LanguageManager'

const Urgent: FunctionComponent = (props) => {
 const { themeColor } = useContext(ThemeContext);
 const { dictionary } = useContext(LanguageContext) 

 let urgentTodos = dictionary.todos.filter((todo,index) => todo.is_urgent)

 return (
  <Layout>
  <ScrollView showsVerticalScrollIndicator={false}>
   <TextComponent textSize="xl" customStyle={styles.title}>{dictionary.urgentTask}</TextComponent>
     <View style={styles.todoWrapper}>
   {urgentTodos.map(({is_urgent,created_at,title,description}) =>
   <Todo key={`key-${title}`} date={created_at} title={title} status={is_urgent} description={description} />
   )}
     </View>
   </ScrollView>
  </Layout>
 )
}

export default memo(Urgent);

const styles = StyleSheet.create({
 title: {
   justifyContent: 'center',
   alignItems: 'center',
   textAlign: 'center',
   padding: 15,
 },
  textDark: {
   color: '#E8EAED',
 },
 textWhite: {
   color: '#121212'
 },
 todoWrapper: {
   paddingHorizontal:15,
 }
})


