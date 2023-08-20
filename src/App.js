import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import Main from './component/Main';
import AllUser from './component/AllUser';
import RegisterUser from './component/RegisterUser';
import CreateAdmin from './component/CreateAdmin';
import axios from "axios";

function App() {
  const api = axios.create({
    baseURL: 'https://login-api.web2rise.in',
  });
  
  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
      }
      return Promise.reject(error);
    },
  );

  return (
    <>
     <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/all-users" element={<AllUser />} />
            <Route path="/create-user" element={<RegisterUser />} />
            <Route path="/add-admin" element={<CreateAdmin />} />
        </Routes>
        <Footer />
     </BrowserRouter>
    </>
  );
}

export default App;
