import { React, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/about-us";
import Sustainability from "./pages/sustainability";
import Safety from "./pages/safety";
import News from "./pages/news";
import ArticlePage from "./pages/ArticlePage"
import Page404 from "./pages/404";
import NavBar from "./components/NavBar";
import Cookies from "./components/Cookies";
import Footer from "./components/Footer"

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <NavBar>
      </NavBar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/sustainability" element={<Sustainability />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:url" element={<ArticlePage />}/>
        <Route path="*" element={<Page404 />} />
      </Routes>

      <Footer>
      </Footer>

      <Cookies>
      </Cookies>
    </>
  );
};