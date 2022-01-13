import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Beer from "../components/Beer"

export default (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/:id" element={<Beer/>} />
    </Routes>
  </BrowserRouter>
);
