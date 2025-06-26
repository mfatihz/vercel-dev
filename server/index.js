import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:5173', // Ganti dengan origin client Anda
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Pastikan POST termasuk
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());

// Create the router
const router = express.Router();

// Sample initial movie data
let movies = [
  { id: 1, title: 'Inception', director: 'Christopher Nolan', year: 2010, genre: 'Sci-Fi' },
  { id: 2, title: 'The Shawshank Redemption', director: 'Frank Darabont', year: 1994, genre: 'Drama' },
  { id: 3, title: 'The Dark Knight', director: 'Christopher Nolan', year: 2008, genre: 'Action' }
];

// API routes
router.get('/movies', (req, res) => {
    console.log('Sending movies:', movies); 
  res.json(movies);
});

router.get('/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send('Movie not found');
  res.json(movie);
});

router.post('/movies', (req, res) => {
  const movie = {
    id: movies.length + 1,
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    genre: req.body.genre
  };
  movies.push(movie);
  res.status(201).json(movie);
});

router.put('/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send('Movie not found');

  movie.title = req.body.title;
  movie.director = req.body.director;
  movie.year = req.body.year;
  movie.genre = req.body.genre;

  res.json(movie);
});

router.delete('/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send('Movie not found');

  const index = movies.indexOf(movie);
  movies.splice(index, 1);

  res.json(movie);
});

// Mount the router
app.use('/api', router);

// For local development
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// For Vercel deployment
export default app;