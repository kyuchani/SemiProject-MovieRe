import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


const BoxMore = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('/src/components/public/movieExplain.json')
      .then((response) => response.json())
      .then((data) => {
        // 각 영화의 rating 값을 숫자로 변환하고 내림차순으로 정렬
        const sortedMovies = data.sort((a, b) => {
          // rating 값을 숫자로 변환
          const ratingA = a.rating && a.rating[0] ? parseFloat(a.rating[0]) : 0;
          const ratingB = b.rating && b.rating[0] ? parseFloat(b.rating[0]) : 0;
          
          // 별점 내림차순 정렬
          return ratingB - ratingA;
        });
        setMovies(sortedMovies);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <div style={{ marginLeft: '140px', marginTop: '25px', marginBottom:"20px", fontSize: '26px' }}>🌟 별점이 높은 작품</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0 120px' }}>
        {movies.slice(0, 20).map((movie, index) => { // 20개까지만 표시
          
          const rating = parseFloat(movie.rating[0]) || 0; // 별점 값

          return (
            <div key={index} style={{ position: 'relative', maxWidth: '200px', margin: '0 20px' }}>
              <Link to={movie.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img
                  src={movie.poster}
                  alt={movie.title}
                  style={{ width: '200px', height: '300px', objectFit: 'cover' }}
                />
                {/* 번호와 아이콘을 겹쳐서 표시 */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    backgroundColor: 'rgba(112, 97, 97, 0.6)', // 배경을 어두운 색으로 설정
                    color: 'white',
                    borderRadius: '50%',
                    padding: '10px',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width:"40px",
                  }}
                >
                  {index + 1}
                </div>
                <p className="movieTitle" style={{ textAlign: 'center', marginTop: '15px', marginBottom: '5px', fontSize: '14px' }}>
                  {movie.title}
                </p>

                {/* 별점 표시 */}
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <span style={{ color: '#FFD700' }}>⭐</span>
                  <span style={{ fontSize: '14px', color: '#FFD700' }}>{rating}</span>
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
