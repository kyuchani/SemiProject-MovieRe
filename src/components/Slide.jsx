import { Carousel } from 'react-bootstrap';
import "./Slide.css"

const Slide = () => {
  return (
    <Carousel className="slide-container" controls={true} indicators={false} interval={3000}>
      <Carousel.Item>
        <img className="d-block w-100" src="/src/images/john.jpg" alt="영화 1" />
        <Carousel.Caption style={{ textAlign: 'left', marginLeft: "-80px" }}>
          <h3>존 윅 3</h3>
          <p>액션 블록버스터! 존 윅이 돌아왔다!</p>
          <button onClick={() => window.open('https://www.youtube.com/watch?v=h883JSfBYOU', '_blank')}>감상하기</button>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-block w-100" src="/src/images/captain-america.jpg" alt="영화 2" />
        <Carousel.Caption style={{ textAlign: 'left', marginLeft: "-80px" }}>
          <h3>캡틴 아메리카:브레이브 뉴 월드</h3>
          <p>역대 최강 히어로들의 마지막 전투</p>
          <button onClick={() => window.open('https://www.youtube.com/watch?v=EPdzdAK3YJ8', '_blank')}>
            감상하기
          </button>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-block w-100" src="/src/images/mickey.jpg" alt="영화 1" />
        <Carousel.Caption style={{ textAlign: 'left', marginLeft: "-80px" }}>
          <h3>미키17</h3>
          <p>봉준호 감독 신작</p>
          <button onClick={() => window.open('https://www.youtube.com/watch?v=MFXWhpcuIg4', '_blank')}>감상하기</button>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-block w-100" src="/src/images/dune.jpg" alt="영화 1" />
        <Carousel.Caption style={{ textAlign: 'left', marginLeft: "-80px" }}>
          <h3>듄:파트 2</h3>
          <p>다시 시작된 전투</p>
          <button onClick={() => window.open('https://www.youtube.com/watch?v=zYXNAXouYQU', '_blank')}>감상하기</button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slide;
