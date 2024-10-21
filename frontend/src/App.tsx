import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Blog } from "./pages/Blog";
import { Blogs } from "./pages/Blogs";
import { Postblog } from "./pages/Postblog";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin/>}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/blog/:id" element={<Blog />}></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route path="/postblog" element={<Postblog />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
