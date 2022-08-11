import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import List from './pages/List';
import Landing from './pages/Landing';
import Navbar from './components/navbar/Navbar';
import { createContext, useState } from "react";
import UpdateItem from './pages/UpdateItem';
export const ThemeContext = createContext(null);

function App() {
  const [listTitle, setListTitle] = useState("");
  const [theme, setTheme] = useState('light');

  // const toggleTheme = () => {
  //   setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  // }

  return (
    <Router>
      <ThemeContext.Provider theme={theme} value={{theme, setTheme}}>
      <main>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Landing listTitle={listTitle} setListTitle={setListTitle}/>} />
          <Route path='/list' element={<List listTitle={listTitle}/>} />
          <Route path='/item/:id' element={<UpdateItem/>} />
        </Routes>
      </main>
      </ThemeContext.Provider>
    </Router>
  );
}

export default App;
