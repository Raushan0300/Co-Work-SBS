import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

const App = () => {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
    <Routes>
      {token ? <Route path="/" element={<Home />} /> : <Route path="/" element={<Auth />} />}
      <Route path="/profile" element={<Profile />} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;