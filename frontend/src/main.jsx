import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonDetailPage from "./Component/PokemonDetailPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/viewDetail/:name" element={<PokemonDetailPage />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
