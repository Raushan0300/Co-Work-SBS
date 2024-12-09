import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Billing from "./pages/Billing";

const App = () => {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
    <Routes>
      {token ? <Route path="/" element={<Home />} /> : <Route path="/" element={<Auth />} />}
      <Route path="/profile" element={<Profile />} />
      <Route path="/billing" element={<Billing />} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;