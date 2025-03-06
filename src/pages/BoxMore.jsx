import { useEffect, useState } from 'react';

const BoxMore = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('/src/components/public/movieExplain.json')
            .then((response) => response.json())
            .then((data) => setMovies(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap'}}>
            {movies.map((movie, index) => (
                <div key={index} style={{maxWidth:"250px",margin:"20px 15px"}}>
                    <img src={movie.poster} alt={movie.title} style={{width:"250px", height:"300px"}}/>
                    <p className="movieTitle">{movie.title}</p>
                </div>
            ))}
        </div>
    );
};

export default BoxMore;
