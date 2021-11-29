import React, {  
    FunctionComponent,
    memo,
    useCallback,
    useContext, 
    useRef 
  } from 'react'
import Layout from '../components/Layout'
import { 
 View,
 StyleSheet, 
 FlatList,
 Animated,
 Dimensions
} from 'react-native'
import Todo from '../components/Todo'
import { TextComponent } from '../components/TextComponent'
import { LanguageContext } from '../utils/LanguageManager'



const All: FunctionComponent = (props) => {
  
  const {width,height} = Dimensions.get('screen');
 const { dictionary } = useContext(LanguageContext) 


const TODO_SIZE = height * 2;

 const renderItem = useCallback(({item,index}) => {
 const inputRange = [-1,0,TODO_SIZE * index, TODO_SIZE * (index+2)];
 
 const scale = scrollY.interpolate({
   inputRange,
   outputRange: [1,1,1,0],
 })

  return <Todo 
    customStyle={{transform: [{scale}]}}
    status={item.is_urgent}
    date={item.created_at}
    title={item.title}
    description={item.description}
  />
 },[])

const keyExtractor = useCallback((item => item.title.toString()), [])
 
const renderSeparator = () => (
  <View
    style={{
      height:15,
    }}
  />
);

const scrollY = useRef(new Animated.Value(0)).current;

 return (
     <Layout>
      {dictionary &&(<>
      <TextComponent textSize="xl" customStyle={styles.title}>{dictionary.title}</TextComponent>
     <Animated.FlatList      
     onScroll={Animated.event(
       [{nativeEvent: {contentOffset: {y:scrollY}}}],
      {useNativeDriver:true})}
   
       contentContainerStyle={{padding:15}}
        showsVerticalScrollIndicator={false}
        data={dictionary.todos}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        ItemSeparatorComponent={renderSeparator}
      />
      </>
      )}
  </Layout>
 )
}

export default memo(All);

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
})


