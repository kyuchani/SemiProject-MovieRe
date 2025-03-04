import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './components/Header';
// import Footer from './components/Footer';
import Login from './pages/LoginPage';
import Main from './pages/HomePage';

function App() {
  return (
    <div className="Container">
      <BrowserRouter>
        <Header />
        <hr />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
