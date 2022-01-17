import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Beer from "../components/Beer"
import SearchPage from "../components/SearchPage";

export default (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/:id" element={<Beer/>} />
        <Route path="/searchPage" exact element={<SearchPage/>} />
    </Routes>
  </BrowserRouter>
);
