import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import List from './pages/List';
import Landing from './pages/Landing';
import Navbar from './components/navbar/Navbar';


function App() {
  // let Component;
  // switch(window.location.pathname){
  //   case "/":
  //     Component = Landing;
  //     break;
  //   case "/list":
  //     Component = List;
  //     break;
    
  // }

  return (
    <Router>
      <Navbar/>
      <main>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/list' element={<List />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
