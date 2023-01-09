import { Route, Routes } from 'react-router-dom'
import GlobalStyles from './components/styled/Global';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Summoner from './pages/Summoner'
import FreeRotation from './pages/FreeRotation';
import About from './pages/About'
import { NavbarContext } from './contexts/NavbarContext';
import { useState } from 'react';

function App() {
  const [isNavActive, setIsNavActive] = useState(false)

  return (
    <NavbarContext.Provider value={{ isNavActive, setIsNavActive }}>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/summoner/*" element={<Summoner />}/>
        <Route path="/leaderboard" element={<Leaderboard />}/>
        <Route path="/free-rotation" element={<FreeRotation />}/>
        <Route path="/about" element={<About />}/>
      </Routes>
    </NavbarContext.Provider>
  );
}

export default App;
