import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

// export function useTheme() {
//   const [isDark, setIsDark] = useContext(ThemeContext);
//   return [isDark, setIsDark];
// }
export const useTheme = () => useContext (ThemeContext)    // Both are correct First we create an fn. then we'll set the states , 
                                                           // Now we Create Arrow function and directly set useContext (ThemeContext)
                                                        // ye isdark , setIsDark likhne ki koi jrurt nhi hai , kyoki at the end ye kam 
                                                        // ThemeContext file me bhi ho rha h to simple use call kr lenge that's it .?

