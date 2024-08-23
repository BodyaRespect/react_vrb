import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Home from './pages/Home/Home';
import MovieDetail from './pages/MovieDetailsPage/MovieDetails';
import Favorites from './pages/Favorites/Favorites';
import Navbar from './components/Navbar/Navbar';

const AppRoutes = () => (
  <Router>
    <Navbar />

    <Routes>
      <Route path="/" element={<Navigate to="/movies" />} />
      <Route path="/movies" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  </Router>
);

export default AppRoutes;
