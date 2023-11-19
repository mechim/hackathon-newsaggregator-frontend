import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import  SignUp  from './pages/SignUp'
import Cabinet from './pages/Cabinet'
import News from './pages/News'
import Article from './pages/Article'



import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";

function App() {
  // const [count, setCount] = useState(0)

  return (
  <Router>
    <Routes>
      <Route path='/sign-up' element = { <SignUp />} />
      <Route path='/cabinet' element = { <Cabinet />} />
      <Route path='/news' element = { <News />} />
      <Route path='/article' element = { <Article />} />
    </Routes>
  </Router>
  
  )
}

export default App
