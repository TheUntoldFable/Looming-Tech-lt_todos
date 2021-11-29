import React,{
  useState,
  createContext,
  FunctionComponent
} from 'react'

export const ThemeContext = createContext('light');

export const ThemeProvider: FunctionComponent = ({children}) => {

  const [themeColor, setThemeColor] = useState<String>('Light');

 
  const toggleTheme = (): void => {
     if(themeColor === 'Light'){
      setThemeColor('Dark')
     } else {
      setThemeColor('Light')
     }
  }

 return (
  <ThemeContext.Provider value={{themeColor,toggleTheme}}>
    {children}
  </ThemeContext.Provider>
 )
}