import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import List from './pages/List';
import Landing from './pages/Landing';
import Navbar from './components/navbar/Navbar';
import { useState } from "react";
import UpdateItem from './pages/UpdateItem';

function App() {
  const [listTitle, setListTitle] = useState("");

  return (
    <Router>
      <main>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Landing listTitle={listTitle} setListTitle={setListTitle}/>} />
          <Route path='/list' element={<List listTitle={listTitle}/>} />
          <Route path='/item/:id' element={<UpdateItem/>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
