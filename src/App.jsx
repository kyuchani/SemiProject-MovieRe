import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/LoginPage';
import Main from './pages/HomePage';
import FindIdPage from './pages/FindIdPage';
import SignupPage from './pages/SingupPage';
import FindPasswordPage from './pages/FindPasswordPage';
import MovieDetail from './components/MovieDetail';
import ReviewPage from './pages/ReviewPage';
import ReviewForm from './pages/ReviewForm';
import Call from './pages/Call';
import Privacy from './pages/privacyPage';
import Info from './pages/infoPage';
import { Outlet } from 'react-router-dom'; // Outlet import

function App() {
  return (
    <div className="Container">
      <BrowserRouter>
        <Routes>
          {/* Header와 Footer가 포함되는 기본 레이아웃 */}
          <Route element={<Layout />}>
            <Route path="/" element={<Main />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/find-id" element={<FindIdPage />} />
            <Route path="/find-password" element={<FindPasswordPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path="/detail/:movieId" element={<MovieDetail />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/review/write" element={<ReviewForm />} />
          </Route>

          {/* Header와 Footer 없이 렌더링되는 라우트 */}
          <Route element={<FullScreenLayout />}>
            <Route path="/call" element={<Call />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/info" element={<Info />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Layout 컴포넌트 정의
const Layout = () => {
  return (
    <>
      <Header />
      <Outlet /> {/* 자식 라우트가 렌더링되는 위치 */}
      <Footer />
    </>
  );
};

// FullScreenLayout 컴포넌트 정의
const FullScreenLayout = () => {
  return (
    <div className="full-screen">
      <Outlet /> {/* 자식 라우트가 렌더링되는 위치 */}
    </div>
  );
};

export default App;
