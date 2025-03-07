import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


const BoxMore = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('/src/components/public/movieExplain.json')
      .then((response) => response.json())
      .then((data) => {
        // 각 영화의 audience 값을 숫자로 변환하고 정렬
        const sortedMovies = data.sort((a, b) => {
          const audienceA = parseInt(a.audience[0].replace(',', '')) || 0;
          const audienceB = parseInt(b.audience[0].replace(',', '')) || 0;
          
          return audienceB - audienceA; // 내림차순 정렬
        });
        setMovies(sortedMovies);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <div style={{ marginLeft: '140px', marginTop: '25px', marginBottom:"20px", fontSize: '26px' }}>🎬 박스 오피스 순위</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0 120px' }}>
        {movies.slice(0, 20).map((movie, index) => { // 20개까지만 표시
          const audience = parseInt(movie.audience[0].replace(',', '')) || 0; // 관람객 수를 숫자로 변환

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
                {/* 관람객 수 표시 */}
                <p className="audience" style={{ textAlign: 'center', marginBottom: '30px', fontSize: '14px', color: '#918d8d' }}>
                  관람객 수: {audience.toLocaleString()}명
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BoxMore;
