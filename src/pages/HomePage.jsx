import Slide from '../components/Slide';
import MovieList from '../components/MovieList';

const Main = () => {
  return (
    <div className="main-container">
      <div className="content">
        <Slide />
        <div>
          <MovieList />
        </div>
      </div>
    </div>
  );
};

export default Main;
