import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

const App = () => {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
    <Routes>
      {token ? <Route path="/" element={<Home />} /> : <Route path="/" element={<Auth />} />}
    </Routes>
    </BrowserRouter>
  );
};

export default App;