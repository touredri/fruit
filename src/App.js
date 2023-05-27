import { Route, Routes } from 'react-router-dom';
import './App.css';
import Details from './components/Details';
import Home from './components/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Details/:fruitName" element={<Details />} />
    </Routes>
  );
}

export default App;
