import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BoxMore = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('/src/components/public/movieExplain.json')
      .then((response) => response.json())
      .then((data) => {
        const currentDate = new Date(); // 현재 날짜

        // 현재 날짜보다 나중인 개봉 예정 영화들만 필터링
        const upcomingMovies = data.filter((movie) => {
          const releaseDate = new Date(movie.releaseDate[0]);
          return releaseDate > currentDate; // 개봉일이 현재 날짜보다 나중인 영화들만
        });

        // 개봉일 기준 오름차순 정렬
        const sortedMovies = upcomingMovies.sort((a, b) => {
          const releaseDateA = new Date(a.releaseDate[0]);
          const releaseDateB = new Date(b.releaseDate[0]);
          return releaseDateA - releaseDateB; // 오름차순 정렬
        });

        setMovies(sortedMovies);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <div style={{ marginLeft: '140px', marginTop: '25px', marginBottom:"20px", fontSize: '26px' }}>🆕 상영예정작</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0 120px' }}>
        {movies.map((movie, index) => {
          const releaseDate = new Date(movie.releaseDate[0]); // 개봉일

          return (
            <div key={index} style={{ maxWidth: '200px', margin: '0 20px' }}>
              <Link to={movie.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img
                  src={movie.poster}
                  alt={movie.title}
                  style={{ width: '200px', height: '300px', objectFit: 'cover' }}
                />
                <p className="movieTitle" style={{ textAlign: 'center', marginTop: '15px', marginBottom: '5px', fontSize: '14px' }}>
                  {movie.title}
                </p>

                {/* 개봉일 출력 */}
                <div style={{ textAlign: 'center', fontSize: '13px', color: '#887f7f', marginBottom:"30px"}}>
                  개봉일 : {releaseDate.toLocaleDateString()} {/* 날짜 출력 */}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BoxMore;
