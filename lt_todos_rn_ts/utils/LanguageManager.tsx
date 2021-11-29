import React,{
 useState,
 createContext,
 FunctionComponent,
 useEffect
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { languageOptions, dictionaryList } from '../localisation';

export const LanguageContext = createContext({
 userLanguage: 'en',
 dictionary: dictionaryList.en
});



export const LanguageProvider: FunctionComponent = ({ children }) => { 
  let defaultLanguage = null;
  const [userLanguage, setUserLanguage] = useState(defaultLanguage === null ? 'en' : null);
  const [updatableJSON, setUpdatableJSON] = useState(dictionaryList[userLanguage])

 AsyncStorage.getItem('rcml-lang').then(v => defaultLanguage=v)

 useEffect(() => {
   if(userLanguage){
     setUpdatableJSON(dictionaryList[userLanguage])
   }
 }, [userLanguage])

  const updateTodo = (title: string) => {
    const updatedTodos = updatableJSON.todos.map(p =>
      p.title === title
        ? { ...p, is_urgent: !p.is_urgent }
        : p
    );
    setUpdatableJSON({...updatableJSON,todos: updatedTodos})
}
 const provider = {
   updateTodo,
   userLanguage,
   dictionary: updatableJSON,
   userLanguageChange: async (selected: string | number) => {
     const newLanguage = languageOptions[selected] ? selected : 'en'
     setUserLanguage(newLanguage);
     await AsyncStorage.setItem('rcml-lang', newLanguage);
   }
 };

 return (
   <LanguageContext.Provider value={provider}>
     {children}
   </LanguageContext.Provider>
 );
};