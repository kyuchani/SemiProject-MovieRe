import { useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // ✅ React Router의 Link 컴포넌트 사용
import "./MovieList.css"

const moviesData = {
  '박스오피스 순위': [
    { title: '미키 17', image: '/src/images/mickeyposter.jpeg', link: '/detail/mickey', audience: '1,000,000' },
    { title: '퇴마록', image: '/src/images/lok.jpeg', link: '/detail/lok', audience: '900,000' },
    { title: '캡틴아메리카', image: '/src/images/captainposter.jpeg', link: '/detail/captain', audience: '800,000' },
    { title: '힘내라 대한민국', image: '/src/images/fighting-korea.jpeg', link: '/detail/korea', audience: '700,000' },
    { title: '괜찮아 괜찮아 괜찮아!', image: '/src/images/okay.jpeg', link: '/detail/okay', audience: '650,000' },
    { title: '울프맨', image: '/src/images/wolfman.jpeg', link: '/detail/wolfman', audience: '600,000' },
    { title: '컴플리트 언노운', image: '/src/images/unknown.jpeg', link: '/detail/unknown', audience: '550,000' },
    { title: '첫 번째 키스', image: '/src/images/first-kiss.jpeg', link: '/deatil/first-kiss', audience: '500,000' },
  ],
  '상영예정작': [
    { title: '플레이브 대쉬 인시네마', image: '/src/images/dash.jpeg', link: '/detail/dash', releaseDate: '2025-03-10' },
    { title: '화이트 버드', image: '/src/images/whitebird.jpeg', link: '/detail/whitebird', releaseDate: '2025-03-15' },
    { title: '위플래쉬', image: '/src/images/whiplash.jpeg', link: '/detail/whiplash', releaseDate: '2025-03-20' },
    { title: '에밀리아 페레즈', image: '/src/images/Emilia.jpeg', link: '/detail/Emilia', releaseDate: '2025-03-25' },
    { title: '노보케인', image: '/src/images/novocaine.jpeg', link: '/detail/novocaine', releaseDate: '2025-03-28' },
    { title: '숨', image: '/src/images/breath.jpeg', link: '/detail/breath', releaseDate: '2025-04-01' },
    { title: '침범', image: '/src/images/somebody.jpeg', link: '/detail/somebody', releaseDate: '2025-04-05' },
    { title: '와일드 투어', image: '/src/images/wildtour.jpeg', link: '/detail/wildtour', releaseDate: '2025-04-10' },
    { title: '호조', image: '/src/images/hozo.jpeg', link: '/detail/hozo', releaseDate: '2025-04-12' },
  ],
  '별점이 높은 작품': [
    { title: '이찬원 콘서트 찬가: 디어 마이 찬스', image: '/src/images/Lee.jpg', link: 'detail.Lee', rating: '4.9' },
    { title: '힘내라 대한민국', image: '/src/images/fighting-korea.jpeg', link: '/detail/korea', rating: '4.7' },
    { title: '퇴마록', image: '/src/images/lok.jpeg', link: '/detail/lok', rating: '4.6' },
    { title: '더 폴: 디렉터스 컷', image: '/src/images/fall.jpeg', link: '/detail/fall', rating: '4.8' },
    { title: '백수아파트', image: '/src/images/mantion.jpeg', link: '/detail/mantion', rating: '4.4' },
    { title: '괜찮아 괜찮아 괜찮아!', image: '/src/images/okay.jpeg', link: '/detail/okay', rating: '4.3' },
    { title: '컴플리트 언노운', image: '/src/images/unknown.jpeg', link: '/detail/unknown', rating: '4.7' },
    { title: '말할 수 없는 비밀', image: '/src/images/secret.jpeg', link: '/detail/secret', rating: '4.9' },
  ],
};

const MovieList = () => {
  const listRefs = useRef([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const categories = Object.keys(moviesData);

  const scrollLeftHandler = (index) => {
    if (listRefs.current[index]) {
      listRefs.current[index].scrollBy({ left: -240, behavior: 'smooth' });
    }
  };

  const scrollRightHandler = (index) => {
    if (listRefs.current[index]) {
      listRefs.current[index].scrollBy({ left: 240, behavior: 'smooth' });
    }
  };

  const handleMouseDown = (e, index) => {
    setIsDragging(true);
    setStartX(e.pageX - listRefs.current[index].offsetLeft);
    setScrollLeft(listRefs.current[index].scrollLeft);
  };

  const handleMouseMove = (e, index) => {
    if (!isDragging) return;
    const x = e.pageX - listRefs.current[index].offsetLeft;
    const walk = (x - startX) * 2;
    listRefs.current[index].scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="movie-list-container">
      {categories.map((category, index) => (
        <div key={index}>
          <hr className="hr" />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{marginBottom:"25px",marginLeft:"5px" ,marginTop:"4px"}}>{category}</h4>
            <Link to={`/more/${category}`} style={{ fontSize: '14px', color: '#a73c2e', textDecoration: 'none'} }>
              더보기
            </Link>
          </div>
          <div className="movie-list-wrapper">
            <button className="scroll-btn left" onClick={() => scrollLeftHandler(index)}>
              <FaChevronLeft />
            </button>
            <div
              className="movie-list"
              ref={(el) => (listRefs.current[index] = el)}
              onMouseDown={(e) => handleMouseDown(e, index)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {moviesData[category].map((movie, idx) => (
                <div key={idx} className="movie-item">
                  <Link to={movie.link} style={{ color: 'inherit', textDecoration: 'none' }}>
                    <img src={movie.image} alt={movie.title} />
                    <p className='movieTitle'>{movie.title}</p>
                    {/* 여기에서 카테고리별 추가 정보를 출력합니다 */}
                    <span className='category'>
                    {category === '박스오피스 순위' && <p>누적 관객수: {movie.audience}</p>}
                    {(category === '상영예정작' ) && <p>{movie.releaseDate} 개봉</p>}
                    {(category === '별점이 높은 작품' ) && <p>⭐ {movie.rating}</p>}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
            <button className="scroll-btn right" onClick={() => scrollRightHandler(index)}>
              <FaChevronRight />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
