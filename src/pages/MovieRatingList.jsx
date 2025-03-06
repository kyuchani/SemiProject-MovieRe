import { useState } from 'react';
import './MovieRatingList.css';

const moviesData = [
    { id: 1, title: '미키 17', rating: 4.5, audience: 1000000, image: '/src/images/mickeyposter.jpeg' },
    { id: 2, title: '퇴마록', rating: 4.7, audience: 900000, image: '/src/images/lok.jpeg' },
    { id: 3, title: '캡틴아메리카', rating: 4.3, audience: 800000, image: '/src/images/captainposter.jpeg' },
    { id: 4, title: '힘내라 대한민국', rating: 4.2, audience: 700000, image: '/src/images/fighting-korea.jpeg' },
    { id: 5, title: '괜찮아 괜찮아 괜찮아', rating: 4.8, audience: 650000, image: '/src/images/okay.jpeg' },
];

const sortedMovies = [...moviesData].sort((a, b) => b.rating - a.rating);

const MovieRatingList = () => {
    const [movies, setMovies] = useState(sortedMovies);

    return (
        <div className="movie-list-container">
            <h2>🌟 별점이 높은 작품</h2>
            <div className="movie-list">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-card">
                        <img src={movie.image} alt={movie.title} />
                        <h3>{movie.title}</h3>
                        <p>
                            ⭐ {movie.rating} | 👥 {movie.audience.toLocaleString()}명
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieRatingList;
