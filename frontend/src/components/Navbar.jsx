import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import axios from "axios";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

const navItems = [
  { label: "Home", href: "/", authentication: false },
  { label: "Home", href: "/", authentication: true },
  { label: "Services", href: "/services", authentication: false },
  { label: "Contact Us", href: "/contact", authentication: false },
  { label: "About", href: "/about", authentication: false },
  { label: "Adopt", href: "/adopt-a-pet", authentication: true },
  { label: "Re-Home", href: "/rehome-a-pet", authentication: true },
  { label: "Blogs ", href: "/blogs", authentication: true },
];

export default function Navbar() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoading((prev) => true);
    console.log("logout");
    axios
      .get("/api/v1/users/logout")
      .then((response) => {
        console.log(response.data);

        setTimeout(() => {
          toast.success("Logged out successfully", {
            position: "top-center",
            delay: 1000,
          });
          setLoading((prev) => false);
          dispatch(logout());
          navigate("/login");
        }, 1000);
      })
      .catch((error) => {
        setLoading((prev) => false);
        toast.error("error has occured while loggind out", {
          position: "top-center",
        });
      });
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userData = useSelector((state) => state.auth.userData);

  const isLoggedIn = useSelector((state) => state.auth.authStatus);

  return (
    <nav className="bg-[#2F0601] shadow-md">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-[100px]">
          <div className="flex items-center">
            <button className="flex-shrink-0" onClick={() => navigate("/")}>
              <img
                className="h-12 w-auto"
                src="images/happypets.png"
                alt="Logo"
              />
            </button>
          </div>
          <div className="hidden md:flex items-center justify-between flex-1 ml-10">
            <div className="flex space-x-6">
              {isLoggedIn &&
                navItems.map(
                  (item) =>
                    item.authentication && (
                      <NavLink
                        key={item.href}
                        to={item.href}
                        className={({ isActive }) =>
                          isActive
                            ? "text-[#2F0601] bg-white font-bold  px-[10px] py-[6px] rounded-md text-base"
                            : "text-white font-bold hover:text-[#2F0601] hover:bg-white px-[10px] py-[6px] rounded-md text-base"
                        }
                      >
                        {item.label}
                      </NavLink>
                    )
                )}
              {!isLoggedIn &&
                navItems.map(
                  (item) =>
                    !item.authentication && (
                      <NavLink
                        key={item.href}
                        to={item.href}
                        className={({ isActive }) =>
                          isActive
                            ? "text-[#2F0601] bg-white font-bold  px-[10px] py-[6px] rounded-md text-base"
                            : "text-white font-bold hover:text-[#2F0601] hover:bg-white px-[10px] py-[6px] rounded-md text-base"
                        }
                      >
                        {item.label}
                      </NavLink>
                    )
                )}
            </div>
            <div className="flex items-center space-x-4">
              {!isLoggedIn && (
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? " bg-white text-[#2f0601] hover:underline hover:ring-inset hover:ring-2 hover:ring-white  px-[10px] py-[6px] rounded-md text-base font-medium"
                      : "bg-[#2F0601] text-white ring-inset ring-2 hover:underline ring-white [#2F0601] px-[10px] py-[6px] rounded-md text-base font-medium"
                  }
                  to={"/login"}
                >
                  Login
                </NavLink>
              )}
              {!isLoggedIn && (
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? " bg-white text-[#2f0601] hover:underline hover:ring-inset hover:ring-2 hover:ring-white  px-[10px] py-[6px] rounded-md text-base font-medium"
                      : "bg-[#2F0601] text-white ring-inset ring-2 hover:underline ring-white [#2F0601] px-[10px] py-[6px] rounded-md text-base font-medium"
                  }
                  to={"/signup"}
                >
                  Signup
                </NavLink>
              )}
              {isLoggedIn && (
                <>
                  <NavLink
                    to={"/profile"}
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#2f0601] flex gap-1 bg-white rounded-md items-center font-medium p-1"
                        : "flex text-white gap-1 ring-white rounded-md items-center font-medium  p-1 hover:underline"
                    }
                  >
                    <User className="h-5 w-5" />
                    profile
                  </NavLink>
                </>
              )}
            </div>
          </div>
          <div className=" flex gap-5 items-center">
            {isLoggedIn && !isMenuOpen && (
              <button
                className={`py-1 px-2 ml-5 rounded-md hover:bg-red-600 hover:text-white font-medium active:underline bg-white text-[#2f0601]`}
                onClick={handleLogout}
              >
                {loading ? (
                  <ClipLoader color={"#2f0601"} size={15} />
                ) : (
                  "Logout"
                )}
              </button>
            )}

            <div className="md:hidden">
              <button
                className={`inline-flex items-center justify-center p-1.5 rounded-md z-50 text-white hover:text-white hover:bg-[#2F0601]  hover:bg-focus:outline-none  focus:ring-white ${
                  isMenuOpen ? "ring-2 ring-white ring-inset" : ""
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu - opening from the left */}
      <div
        className={`fixed inset-y-0 left-0 w-[300px] flex-col md:hidden border-white border-r-2 border-opacity-20 bg-[#2F0601] shadow-xl transform transition-transform duration-300 ease-in-out z-20 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex-col">
          <div
            className="pt-[26px] pb-3 space-y-3"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex ml-4 items-center mb-8">
              <button onClick={() => navigate("/")} className="flex-shrink-0">
                <img
                  className="h-12 w-auto"
                  src="images/happypets.png"
                  alt="Logo"
                />
              </button>
            </div>

            {isLoggedIn &&
              navItems.map(
                (item) =>
                  item.authentication && (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      className={(isActive) =>
                        isActive
                          ? "block px-4 py-2 text-base font-medium bg-bg-[#ad7f47]  text-white hover:text-[#2F0601] hover:bg-white"
                          : " block px-4 py-2 text-base font-medium bg-[#ad7f47] hover:text-[#2F0601] hover:bg-white"
                      }
                    >
                      {item.label}
                    </NavLink>
                  )
              )}
              {!isLoggedIn &&
              navItems.map(
                (item) =>
                  !item.authentication && (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      className={(isActive) =>
                        isActive
                          ? "block px-4 py-2 text-base font-medium bg-bg-[#ad7f47]  text-white hover:text-[#2F0601] hover:bg-white"
                          : " block px-4 py-2 text-base font-medium bg-[#ad7f47] hover:text-[#2F0601] hover:bg-white"
                      }
                    >
                      {item.label}
                    </NavLink>
                  )
              )}
          </div>
          {isLoggedIn && (
            <div className="w-full fixed bottom-0 p-2.5">
              <div className="bg-white w-full rounded-md flex gap-2 justify-between px-3 py-3 items-center ">
                <div className="flex gap-3 px-1 w-[100px] items-center">
                  <img
                    src={userData.profileImage || ""}
                    className="flex-none w-12 h-12 ring-2 ring-[#2f0601] rounded-full"
                  />

                  <span className="block text-sm text-[#2f0601] text-left font-semibold">
                    {userData.fullName}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsMenuOpen((prev) => !prev);
                    navigate("/profile");
                  }}
                  className="text-gray-700 text-sm px-1.5 py-2 duration-150 bg-white hover:bg-gray-100"
                >
                  view Profile
                </button>
              </div>
            </div>
          )}
          {!isLoggedIn && (
            <div className="flex bottom-3 justify-evenly m-2 ml-4 ">
              <button
                className=" px-3  py-[6px]   bg-white text-[#2F0601] hover:bg-[#2F0601] hover:text-white hover:cursor-pointer hover:ring-2 hover:ring-white rounded-md"
                onClick={() => {
                  setIsMenuOpen((prev) => !prev);
                  navigate("/login");
                }}
              >
                login
              </button>

              <button
                className="bg-white    text-[#2F0601] px-3 py-[6px] rounded-md hover:bg-[#2F0601] hover:text-white hover:cursor-pointer hover:ring-2 hover:ring-white "
                onClick={() => {
                  setIsMenuOpen((prev) => !prev);
                  navigate("/signup");
                }}
              >
                signup
              </button>
            </div>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-[#2F0601] md:hidden bg-opacity-50 z-10"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
}
