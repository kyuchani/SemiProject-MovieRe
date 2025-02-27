import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

import MovieList from './pages/MovieListPage';
import WriteReviewPage from './pages/WriteReviewPage';
import CategoryPage from './pages/CategoryPage';
import RecentReview from './pages/RecentReview';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact={true} element={<HomePage />}></Route>
          <Route path="/CG" exact={true} element={<CategoryPage />}></Route>
          <Route path="/RR" exact={true} element={<RecentReview />}></Route>
          <Route path="/ML" exact={true} element={<MovieList />}></Route>
          <Route path="/WR" exact={true} element={<WriteReviewPage />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
