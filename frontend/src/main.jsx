import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import store from "./store/store.js";
import { CookiesProvider } from "react-cookie";
import { ToastContainer } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Provider } from "react-redux";

import App from "./App.jsx";

import HomePage from "./pages/Home.jsx";
import AboutPage from "./pages/About.jsx";
import ContactPage from "./pages/Contact.jsx";
import ServicesPage from "./pages/Services.jsx";
import LoginPage from "./pages/Login.jsx";
import SignupPage from "./pages/Signup.jsx";
import EditProfilePage from "./pages/EditProfile.jsx";
import ProfilePage from "./pages/Profile.jsx";
import FAQSPage from "./pages/FAQS.jsx";
import BlogsPage from "./pages/Blogs.jsx";
import AdoptPage from "./pages/Adopt.jsx";
import RehomePage from "./pages/Rehome.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import UserBlogsPage from "./pages/UserBlogs.jsx";
import DogsPage from "./pages/Dogs.jsx";
import CatsPage from "./pages/Cats.jsx";
import BirdsPage from "./pages/Birds.jsx";
import ViewPet from "./pages/ViewPet.jsx";
import AddBlog from "./pages/AddBlog.jsx";
import EditBlog from "./pages/EditBlog.jsx";

import AuthMiddleware from "./components/auth/AuthMiddleware.jsx";
import Blog from "./pages/Blog.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      toastStyle={{ width: "300px", marginTop: "10px" }}
    />

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="*" element={<PageNotFound />} />
          <Route index path="/" element={<HomePage />} />
          <Route
            path="login"
            element={
              <AuthMiddleware authentication={false}>
                <LoginPage />
              </AuthMiddleware>
            }
          />
          <Route
            path="signup"
            element={
              <AuthMiddleware authentication={false}>
                <SignupPage />
              </AuthMiddleware>
            }
          />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="profile">
            <Route index element={<ProfilePage />} />
            <Route path="edit" element={<EditProfilePage />} />
            <Route path="blogs">
              <Route index element={<UserBlogsPage />} />
              <Route path=":blogId/view" element={<Blog />} />
              <Route path=":blogId/edit" element={<EditBlog />} />
            </Route>
          </Route>
          <Route path="faqs" element={<FAQSPage />} />

          <Route path="blogs">
            <Route index element={<BlogsPage />} />
            <Route path="add-blog">
              <Route index element={<AddBlog />} />
            </Route>
            <Route path=":blogId/view" element={<Blog />} />
          </Route>
          <Route path="/rehome-a-pet">
            <Route index element={<RehomePage />} />
          </Route>
          <Route path="adopt-a-pet">
            <Route index element={<AdoptPage />} />
            <Route path="dogs">
              <Route index element={<DogsPage />} />
            </Route>
            <Route path="cats">
              <Route index element={<CatsPage />} />
            </Route>
            <Route path="birds">
              <Route index element={<BirdsPage />} />
            </Route>
            <Route path=":type/:id" element={<ViewPet />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
