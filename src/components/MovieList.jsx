import { useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // ✅ React Router의 Link 컴포넌트 사용

const moviesData = {
  '박스오피스 순위': [
    { title: '미키 17', image: '/src/images/mickeyposter.jpeg', link: '/detail/mickey' },
    { title: '퇴마록', image: '/src/images/lok.jpeg', link: '/detail/lok' },
    { title: '캡틴아메리카', image: '/src/images/captainposter.jpeg', link: '/detail/captain' },
    { title: '힘내라 대한민국', image: '/src/images/fighting-korea.jpeg', link: '/detail/korea' },
    { title: '괜찮아 괜찮아 괜찮아!', image: '/src/images/okay.jpeg', link: '/detail/okay' },
    { title: '울프맨', image: '/src/images/wolfman.jpeg', link: '/detail/wolfman' },
    { title: '컴플리트 언노운', image: '/src/images/unknown.jpeg', link: '/detail/unknown' },
    { title: '첫 번째 키스', image: '/src/images/first-kiss.jpeg', link: '/deatil/first-kiss' },
  ],
  상영예정작: [
    { title: '플레이브 대쉬 인시네마', image: '/src/images/dash.jpeg', link: '/detail/dash' },
    { title: '화이트 버드', image: '/src/images/whitebird.jpeg', link: '/detail/whitebird' },
    { title: '위플래쉬', image: '/src/images/whiplash.jpeg', link: '/detail/whiplash' },
    { title: '에밀리아 페레즈', image: '/src/images/Emilia.jpeg', link: '/detail/Emilia' },
    { title: '노보케인', image: '/src/images/novocaine.jpeg', link: '/detail/novocaine' },
    { title: '숨', image: '/src/images/breath.jpeg', link: '/detail/breath' },
    { title: '침범', image: '/src/images/somebody.jpeg', link: '/detail/somebody' },
    { title: '와일드 투어', image: '/src/images/wildtour.jpeg', link: '/detail/wildtour' },
    { title: '호조', image: '/src/images/hozo.jpeg', link: '/detail/hozo' },
  ],
  '별점이 높은 작품': [
    { title: '이찬원 콘서트 찬가: 디어 마이 찬스', image: '/src/images/Lee.jpg', link: 'detail.Lee' },
    { title: '힘내라 대한민국', image: '/src/images/fighting-korea.jpeg', link: '/detail/korea' },
    { title: '퇴마록', image: '/src/images/lok.jpeg', link: '/detail/lok' },
    { title: '더 폴: 디렉터스 컷', image: '/src/images/fall.jpeg', link: '/detail/fall' },
    { title: '백수아파트', image: '/src/images/mantion.jpeg', link: '/detail/mantion' },
    { title: '괜찮아 괜찮아 괜찮아!', image: '/src/images/okay.jpeg', link: '/detail/okay' },
    { title: '컴플리트 언노운', image: '/src/images/unknown.jpeg', link: '/detail/unknown' },
    { title: '말할 수 없는 비밀', image: '/src/images/secret.jpeg', link: '/detail/secret' },
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
      listRefs.current[index].scrollBy({ left: -180, behavior: 'smooth' });
    }
  };

  const scrollRightHandler = (index) => {
    if (listRefs.current[index]) {
      listRefs.current[index].scrollBy({ left: 180, behavior: 'smooth' });
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4>{category}</h4>
            <Link to={`/more/${category}`} style={{ fontSize: '14px', color: 'gray', textDecoration: 'none' }}>
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
                    <p>{movie.title}</p>
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
