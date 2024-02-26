import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePagePre from "./pages/HomePagePre";
import Index from "./pages/Index";
// import ShowBridge from './pages/ShowBridge';
import Show3D from "./pages/Show3D";
import ShowGML from "./pages/ShowGML";
import Survey from "./pages/Survey";
import Sust from "./pages/Sust";
import Constnotices from "./pages/Constnotices";
import Roadclosures from "./pages/Roadclosures";
import Videos from "./pages/Videos";
import Drawings from "./pages/Drawings";
import FAQ from "./pages/FAQ";
import Vote from "./pages/Vote";
import About from "./pages/About";
import Design from "./pages/Design";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BCF from "./pages/BCF";
import Statistics from "./pages/Statistics";
import OTP from "./pages/OTP";
import "@coreui/coreui/dist/css/coreui.min.css";




function App() {
  // Session.set("isLoggedIn" , "false");
  // Session.set("username" , "none");
  

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePagePre />} />
        <Route path="/index" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/Design" element={<Design />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={ localStorage.getItem('username') ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/Constnotices" element={<Constnotices />} />
        <Route path="/Roadclosures" element={<Roadclosures />} />
        <Route path="/Drawings" element={<Drawings />} />
        <Route path="/Videos" element={<Videos />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/sust" element={<Sust />} />
        <Route path="/bridges/details/:id" element={<Vote />} />
        <Route path="/bcf" element={localStorage.getItem('username')   ? <BCF /> : <Navigate to="/login" />} />
        <Route path="/bridges/3d/:id" element={<Show3D />} />
        <Route path="/bridges/gml/:id" element={<ShowGML />} />
        <Route path="/Statistics" element={<Statistics />} />
        <Route path="/otp" element={<OTP/>} />
        {/* <Route path='/books/delete/:id' element = {<DeleteBook/>} /> */}
      </Routes>
    </>
  );
}

export default App;
