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

function App() {
  return (
    <div className="Container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route 
          path="/" element={<Main />} />
          <Route path="/Login" element={<Login />} />
                    <Route path="/find-id" element={<FindIdPage />} />
                    <Route path="/find-password" element={<FindPasswordPage/>} />
                    <Route path="/sign-up" element={<SignupPage />} />
        </Routes>
        <Footer />  
      </BrowserRouter>
    </div>
  );
}

export default App;
