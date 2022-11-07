import { useEffect } from 'react';
import './App.css';
import './Style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNavBar from './components/TopNavbar';
import SideBarMenu from './components/SideBarMenu';
import { Routes, Route } from 'react-router-dom';
import Home from './layouts/Home';
import ListsPostPage from './layouts/ListsPostPage';

function App() {
  useEffect(() => {
    document.title = "Admin"
 }, []);
  return (
    <div className="nav-fixed">
      <TopNavBar></TopNavBar>
      <div id="layoutSidenav">
          <SideBarMenu/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<ListsPostPage />} />
          </Routes> 
      </div>
    </div>
  );
}

export default App;
