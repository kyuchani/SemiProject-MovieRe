import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // 좌우 화살표 아이콘

// ✅ 카테고리별 영화 데이터
const moviesData = {
  "박스오피스 순위": [
    { title: "존윅3", image: "/src/images/jhonwick3poster.jpeg", link: "/detail/johnwick3" },
    { title: "캡틴아메리카", image: "/src/images/captainposter.jpeg", link: "/detail/spiderman" },
    { title: "미키 17", image: "/src/images/mickeyposter.jpeg", link: "/detail/batman" },
    { title: "존윅3", image: "/src/images/jhonwick3poster.jpeg", link: "/detail/johnwick3" },
    { title: "캡틴아메리카", image: "/src/images/captainposter.jpeg", link: "/detail/spiderman" },
    { title: "미키 17", image: "/src/images/mickeyposter.jpeg", link: "/detail/batman" },
    { title: "존윅3", image: "/src/images/jhonwick3poster.jpeg", link: "/detail/johnwick3" },
    { title: "캡틴아메리카", image: "/src/images/captainposter.jpeg", link: "/detail/spiderman" },
    { title: "미키 17", image: "/src/images/mickeyposter.jpeg", link: "/detail/batman" },
  
  ],
  "상영예정작": [
    { title: "존윅3", image: "/src/images/jhonwick3poster.jpeg", link: "/detail/johnwick3" },
    { title: "캡틴아메리카", image: "/src/images/captainposter.jpeg", link: "/detail/spiderman" },
    { title: "미키 17", image: "/src/images/mickeyposter.jpeg", link: "/detail/batman" },
    { title: "존윅3", image: "/src/images/jhonwick3poster.jpeg", link: "/detail/johnwick3" },
    { title: "캡틴아메리카", image: "/src/images/captainposter.jpeg", link: "/detail/spiderman" },
    { title: "미키 17", image: "/src/images/mickeyposter.jpeg", link: "/detail/batman" },
    { title: "존윅3", image: "/src/images/jhonwick3poster.jpeg", link: "/detail/johnwick3" },
    { title: "캡틴아메리카", image: "/src/images/captainposter.jpeg", link: "/detail/spiderman" },
    { title: "미키 17", image: "/src/images/mickeyposter.jpeg", link: "/detail/batman" },
  
  ],
  "별점이 높은 작품": [
    { title: "존윅3", image: "/src/images/jhonwick3poster.jpeg", link: "/detail/johnwick3" },
    { title: "캡틴아메리카", image: "/src/images/captainposter.jpeg", link: "/detail/spiderman" },
    { title: "미키 17", image: "/src/images/mickeyposter.jpeg", link: "/detail/batman" },
    { title: "존윅3", image: "/src/images/jhonwick3poster.jpeg", link: "/detail/johnwick3" },
    { title: "캡틴아메리카", image: "/src/images/captainposter.jpeg", link: "/detail/spiderman" },
    { title: "미키 17", image: "/src/images/mickeyposter.jpeg", link: "/detail/batman" },
    { title: "존윅3", image: "/src/images/jhonwick3poster.jpeg", link: "/detail/johnwick3" },
    { title: "캡틴아메리카", image: "/src/images/captainposter.jpeg", link: "/detail/spiderman" },
    { title: "미키 17", image: "/src/images/mickeyposter.jpeg", link: "/detail/batman" },
  
  ]
};

const MovieList = () => {
  const listRefs = useRef([]); // ✅ 여러 개의 ref를 저장할 배열
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const categories = Object.keys(moviesData); // ✅ 카테고리 목록 가져오기

  // ▶ 왼쪽 버튼 클릭 시 이동
  const scrollLeftHandler = (index) => {
    if (listRefs.current[index]) {
      listRefs.current[index].scrollBy({ left: -180, behavior: "smooth" });
    }
  };

  // ▶ 오른쪽 버튼 클릭 시 이동
  const scrollRightHandler = (index) => {
    if (listRefs.current[index]) {
      listRefs.current[index].scrollBy({ left: 180, behavior: "smooth" });
    }
  };

  // 🎯 마우스 클릭 후 드래그 기능
  const handleMouseDown = (e, index) => {
    setIsDragging(true);
    setStartX(e.pageX - listRefs.current[index].offsetLeft);
    setScrollLeft(listRefs.current[index].scrollLeft);
  };

  const handleMouseMove = (e, index) => {
    if (!isDragging) return;
    const x = e.pageX - listRefs.current[index].offsetLeft;
    const walk = (x - startX) * 2; // 드래그 속도 조절
    listRefs.current[index].scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="movie-list-container">
      {categories.map((category, index) => (
        <div key={index}>
          <h4>{category}</h4>
          <div className="movie-list-wrapper">
            <button className="scroll-btn left" onClick={() => scrollLeftHandler(index)}>
              <FaChevronLeft />
            </button>
            <div
              className="movie-list"
              ref={(el) => (listRefs.current[index] = el)} // ✅ 각 리스트에 고유 ref 할당
              onMouseDown={(e) => handleMouseDown(e, index)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp} // 마우스를 바깥으로 빼도 끊김 방지
            >
              {moviesData[category].map((movie, idx) => (
                <div key={idx} className="movie-item">
                  <img src={movie.image} alt={movie.title} />
                  <p>{movie.title}</p>
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
