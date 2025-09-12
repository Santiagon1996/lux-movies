import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MovieDetail from './app/components/templates/MovieDetail';
import Home from './app/components/templates/Home';
import WishList from './app/components/templates/WishList';
import Header from './app/components/organism/Header';
import { useLocation } from 'react-router-dom';

const App: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <Header isActive={isHome} />
      <main className="min-h-screen bg-gray-100 p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:movieId" element={<MovieDetail />} />
          <Route path="*" element={<div className="text-center text-red-500">Página no encontrada</div>} />
          <Route path="/wishlist" element={<WishList />} />
        </Routes>
      </main>
    </>
  );
};

export default App;