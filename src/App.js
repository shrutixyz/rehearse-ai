import Home from "./screens/home";
import Landing from "./screens/landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
