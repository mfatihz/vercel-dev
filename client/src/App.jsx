import { Routes, Route, Link } from 'react-router';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import AddMovie from './components/AddMovie';
import EditMovie from './components/EditMovie';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav>
        <h1>Movie App</h1>
        <Link to="/">Home</Link>
        <Link to="/add">Add Movie</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/add" element={<AddMovie />} />
        <Route path="/edit/:id" element={<EditMovie />} />
      </Routes>
    </div>
  );
}

export default App;