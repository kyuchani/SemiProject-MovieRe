import { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { FaSearch, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // 햄버거 메뉴 상태 관리
  const [search, setSearch] = useState(''); // 검색어 상태 관리
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

  const [movies, setMovies] = useState([]); // 초기 상태는 빈 배열
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

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

  if (loading) {
    return <div>Loading...</div>;
  }

  // 검색 처리 함수
  const handleSearch = () => {
    const movie = movies.find((movie) => movie.title === search);
    if (movie) {
      navigate('/detail/:movieId'); // 해당 영화의 상세 페이지로 이동
    } else {
      alert('영화를 찾을 수 없습니다.');
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
              onChange={(e) => setSearch(e.target.value)} // 검색어 입력 처리
            />
            <Button variant="outline-light" className="search-btn" onClick={handleSearch}>
              <FaSearch /> {/* 돋보기 아이콘 */}
            </Button>
          </Form>

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
            <Nav.Link href="#">🎬 박스 오피스 순위</Nav.Link>
          </li>
          <li>
            <Nav.Link href="#">🆕 상영예정작</Nav.Link>
          </li>
          <li>
            <Nav.Link href="#">🌟 별점이 높은 작품</Nav.Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
