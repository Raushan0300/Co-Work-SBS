import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Room from "./pages/Room";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import History from "./pages/History";

const App = () => {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/room" element={<Room />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/history" element={<History />} />
    </Routes>
    <Footer />
    </BrowserRouter>
  );
};

export default App;