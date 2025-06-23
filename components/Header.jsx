import { useTheme } from "../Hooks/useTheme"

export default function Header() {
  const [isDark, setIsDark] = useTheme()
  
  return (
    <header className={`header-container ${isDark? 'dark' : ''}`}>
      <div className="header-content">
        <h2 className="title">
          <a href="/">Where in the world?</a>
        </h2>
        <p className="theme-changer" onClick={()=>{
          // document.body.classList.toggle('dark')
          setIsDark(!isDark)
          localStorage.setItem('isDarkMode', !isDark)
        }}>
          {/* /How to change Sun to Moon OR Moon to Sun  to do this ( create an state ) */}
           <i className={`fa-solid fa-${isDark ? 'sun': 'moon'}` }/> 
          &nbsp;&nbsp;{isDark?'light' : 'Dark'} Mode
        </p>
      </div>
    </header>
  )
}
