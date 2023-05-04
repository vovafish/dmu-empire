import './App.css';
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext";
import Header from './Header.js';
import Footer from './Footer';
import Home from './Home';
import Shop from './Shop';
import About from './About';
import Contact from './Contact';
import ProductDetail from "./ProductDetail";
import { Login } from './Login';
import { Logout } from "./Logout";
import { Register } from './Register';
import UserProfile from './UserProfile';
import UserChangePassword from './UserChangePassword';
import { InquiryRecords } from "./InquiryRecords";

function App() {
  return (
    <AuthProvider>
      <Header></Header>

      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/category/:cat_id" element={<Shop></Shop>}></Route>
        <Route
          path="/product/:product_id"
          element={<ProductDetail></ProductDetail>}
        ></Route>
        <Route path="about" element={<About></About>}></Route>
        <Route path="contact" element={<Contact></Contact>}></Route>
        <Route path="signIn" element={<Login></Login>}></Route>
        <Route path="signUp" element={<Register></Register>}></Route>
        <Route path="signOut" element={<Logout></Logout>}></Route>
        <Route path="userProfile" element={<UserProfile></UserProfile>}></Route>
        <Route
          path="changePassword"
          element={<UserChangePassword></UserChangePassword>}
        ></Route>
        <Route
          path="inqiryRecords"
          element={<InquiryRecords></InquiryRecords>}
        ></Route>
      </Routes>
      <Footer></Footer>
    </AuthProvider>
  );
}

export default App;
