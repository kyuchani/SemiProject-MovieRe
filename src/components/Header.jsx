import { useEffect, useState, useRef } from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button, ListGroup } from 'react-bootstrap';
import { FaSearch, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // 햄버거 메뉴 상태 관리
  const [search, setSearch] = useState(''); // 검색어 상태 관리
  const [movies, setMovies] = useState([]); // 영화 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [filteredMovies, setFilteredMovies] = useState([]); // 검색어와 일치하는 영화 목록
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // 하이라이트된 항목의 인덱스
  const searchInputRef = useRef(null); // 검색 input에 대한 참조
  const autocompleteRef = useRef(null); // 자동완성 목록에 대한 참조
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

  useEffect(() => {
    // JSON 파일을 fetch로 불러오기
    fetch('/src/components/public/movieExplain.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // JSON 파싱
      })
      .then((data) => {
        setMovies(data); // 영화 데이터 설정
        setLoading(false); // 로딩 완료
      })
      .catch((error) => {
        console.error('Error loading movies:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // 클릭 외부 감지
    const handleClickOutside = (e) => {
      if (
        searchInputRef.current && !searchInputRef.current.contains(e.target) && // 검색 input 밖 클릭
        autocompleteRef.current && !autocompleteRef.current.contains(e.target) // 자동완성 목록 밖 클릭
      ) {
        setFilteredMovies([]); // 자동완성 목록 숨기기
      }
    };

    // ESC 키를 눌렀을 때 자동완성 목록 닫기
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        setFilteredMovies([]); // 자동완성 목록 숨기기
      }
    };

    // 이벤트 리스너 추가
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    // Cleanup 함수 (컴포넌트 언마운트 시 이벤트 리스너 제거)
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // 검색 처리 함수
  const handleSearch = () => {
    const movie = movies.find((movie) => movie.title === search);
    if (movie) {
      navigate(`/detail/${movie.id}`); // 해당 영화의 상세 페이지로 이동
    } else {
      alert('영화를 찾을 수 없습니다.');
    }
  };

  // 검색어 변경 시 필터링
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    // 검색어가 있을 경우, 영화 목록에서 제목을 기준으로 필터링
    if (value) {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredMovies(filtered); // 필터링된 영화들 업데이트
    } else {
      setFilteredMovies([]); // 검색어가 비었으면 필터링 결과를 초기화
    }
    setHighlightedIndex(-1); // 필터링할 때마다 하이라이트 초기화
  };

  // 자동완성 항목 클릭 시 해당 영화 페이지로 이동
  const handleSuggestionClick = (movieId) => {
    navigate(`/detail/${movieId}`);
    setSearch(''); // 검색어 초기화
    setFilteredMovies([]); // 필터링된 목록 초기화
  };

  // 엔터 키를 눌렀을 때 검색 처리
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (highlightedIndex >= 0) {
        handleSuggestionClick(filteredMovies[highlightedIndex].id); // 하이라이트된 항목 선택
      } else {
        handleSearch(); // 엔터 키로 검색
      }
    } else if (e.key === 'ArrowDown') {
      // 아래 화살표 눌렀을 때 하이라이트
      setHighlightedIndex((prevIndex) => Math.min(filteredMovies.length - 1, prevIndex + 1));
    } else if (e.key === 'ArrowUp') {
      // 위 화살표 눌렀을 때 하이라이트
      setHighlightedIndex((prevIndex) => Math.max(0, prevIndex - 1));
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <Navbar expand="lg" className="navbar">
        <Container className="navbar-container">
          {/* 좌측 로고 */}
          <Navbar.Brand href="/" className="logo">
            <img src="/src/images/movielogo.png" alt="Logo" className="logo-icon" />
            <span className="logo-text">ReMovie</span>
          </Navbar.Brand>

          {/* 가운데 검색창 */}
          <Form className="search-form" onSubmit={(e) => e.preventDefault()}>
            <FormControl
              type="text"
              placeholder="검색어를 입력해 주세요"
              className="search-input"
              value={search}
              onChange={handleSearchChange} // 검색어 입력 처리
              onKeyDown={handleKeyDown} // 키보드 이벤트 처리
              ref={searchInputRef} // ref 추가
            />
            <Button variant="outline-light" className="search-btn" onClick={handleSearch}>
              <FaSearch /> {/* 돋보기 아이콘 */}
            </Button>
          </Form>

          {/* 자동완성 목록 */}
          {filteredMovies.length > 0 && (
            <ListGroup className="autocomplete-list" ref={autocompleteRef}>
              {filteredMovies.map((movie, index) => (
                <ListGroup.Item
                  key={movie.id}
                  action
                  onClick={() => handleSuggestionClick(movie.id)}
                  active={index === highlightedIndex} // 하이라이트된 항목 스타일 적용
                >
                  {movie.title}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}

          {/* 우측 로그인 & 햄버거 메뉴 */}
          <div className="nav-right">
            <Nav.Link href="/Login" className="login-btn">
              로그인
            </Nav.Link>
            <Button variant="outline-light" className="menu-btn" onClick={toggleMenu}>
              <FaBars /> {/* 햄버거 메뉴 아이콘 */}
            </Button>
          </div>
        </Container>
      </Navbar>

      {/* ✅ 햄버거 버튼 클릭 시 펼쳐지는 메뉴 */}
      <div className={`hamburger-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <Nav.Link href="/boxmore">🎬 박스 오피스 순위</Nav.Link>
          </li>
          <li>
            <Nav.Link href="/res">🆕 상영예정작</Nav.Link>
          </li>
          <li>
            <Nav.Link href="/rating">🌟 별점이 높은 작품</Nav.Link>
          </li>
          <li>
            <Nav.Link href="/review">✍️ 리뷰 쓰기</Nav.Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;