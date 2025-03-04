import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './components/Header';
// import Footer from './components/Footer';
import Main from './pages/Main';

function App() {
  return (
    <div className="Container">
      <BrowserRouter>
        <Header />
        <hr />
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
