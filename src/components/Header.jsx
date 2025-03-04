import  {useState} from "react";
import { Navbar, Container, Nav, Form, FormControl, Button } from "react-bootstrap";
import { FaSearch, FaBars } from "react-icons/fa";


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // 햄버거 메뉴 상태 관리

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
        <Form className="search-form">
          <FormControl
            type="text"
            placeholder="검색어를 입력해 주세요"
            className="search-input"
          />
          <Button variant="outline-light" className="search-btn">
            <FaSearch /> {/*  돋보기 아이콘 */}
          </Button>
        </Form>

        {/* 우측 로그인 & 햄버거 메뉴 */}
        <div className="nav-right">
          <Nav.Link href="/Login" className="login-btn">로그인</Nav.Link>
          <Button variant="outline-light" className="menu-btn" onClick={toggleMenu}>
            <FaBars />  {/*  햄버거 메뉴 아이콘 */}
          </Button> 
        </div>
      </Container>
    </Navbar> 

          {/* ✅ 햄버거 버튼 클릭 시 펼쳐지는 메뉴 */}
      <div className={`hamburger-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          <li><Nav.Link href="/ML">🎬 영화목록</Nav.Link></li>
          <li><Nav.Link href="/RR">🆕 최신리뷰</Nav.Link></li>
          <li><Nav.Link href="/CG">📂 카테고리</Nav.Link></li>
          <li><Nav.Link href="/WR">✍ 리뷰 작성</Nav.Link></li>
        </ul>
      </div>

    </>

    
    
  );
};

export default Header;
