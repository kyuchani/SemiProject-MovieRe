import { useState } from 'react';
import { Button, Container, Form, Image, Modal, Nav, Navbar } from 'react-bootstrap';

const Header = () => {
  //로고(홈버튼), 메뉴바, 검색, 로그인, 회원가입 등
  //메뉴바 : 영화목록, 최신리뷰, 카테고리, 리뷰 작성 등
  //-->아이디어 있으면 바꿔도 됨
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container className="mt-1 mb-2" style={{ left: 0, marginLeft: "20px"}}>
          <Navbar.Brand href="/" >
            <Image alt="" src="/src/images/sample.webp" width="30" height="30" className="d-inline-block align-top" />{' '}
            영화리뷰사이트
          </Navbar.Brand>
          <Nav className="me-auto" >
            <Nav.Link href="/ML">영화목록</Nav.Link>
            <Nav.Link href="/CG">카테고리</Nav.Link>
            <Nav.Link href="/RR">최신리뷰</Nav.Link>
            <Nav.Link href="/WR">리뷰작성</Nav.Link>
          </Nav>
          <Nav className="ml-auto" style={{position: 'absolute', right: 0, marginRight: "30px"}}>
            <Button variant="light" onClick={handleShow}>
              로그인
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" autoFocus />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
            <Button variant="light" onClick={handleShow}>
              회원가입
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" autoFocus />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
