import { useEffect, useState, useRef } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, matchPath, useLocation , useNavigate } from "react-router-dom";

import logo from "../../assets/Logo/study4U_logo_light _new.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropDown";
import { logout } from "../../services/operations/authAPI";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);

   
  const menuRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    ;(async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        //console.log('res',res);
        setSubLinks(res.data.allTags);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })()
  }, [])

  //console.log("sub links", subLinks);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  }

  return (
    <div
    //bg-richblack-800
      className={`flex h-14 items-center justify-center ${
        location.pathname !== "/" ? "" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>
        {/* Navigation links */}
        <nav className="hidden lg:block">
          <ul className="flex gap-x-2  items-center">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`w-28 h-9 rounded-lg justify-center font-medium group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-300 bg-richblack-900"
                          : "text-black"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length ? (
                          <>
                            {subLinks
                              ?.filter(
                                (subLink) => subLink?.name?.length > 0
                              )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split("/").join("-")
                                    .split(" ").join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`w-28 h-9 rounded-lg flex items-center justify-center font-medium ${
                        matchRoute(link?.path)
                          ? "text-yellow-300 bg-richblack-900"
                          : "text-black"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>

        </nav>
        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 lg:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-900 " />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-900 text-center text-xs font-bold text-yellow-300">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="w-28 h-9 rounded-lg  border border-richblack-700 text-white bg-richblack-900 font-medium hover:scale-95 transition-all duration-200">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="w-28 h-9 rounded-lg  border border-richblack-700 text-white bg-richblack-900 font-medium hover:scale-95 transition-all duration-200">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        <div className="lg:hidden flex  gap-x-2">
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-900 " />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-900 text-center text-xs font-bold text-yellow-300">
                  {totalItems}
                </span>
              )}
            </Link>
            {user && 
            <Link to="/dashboard/my-profile">
                  <div className="">
                    <img
                      src={user?.image}
                      alt={`profile-${user?.firstName}`}
                      className="aspect-square w-[30px] rounded-full object-cover"
                    />
                  </div>
            </Link>
          }
        </div>
        {/* <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button> */}
        {/* Mobile Menu Button */}
        <button
          className="mr-4 lg:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <AiOutlineClose fontSize={24} /> : <AiOutlineMenu fontSize={24} />}
        </button>
      </div>
      {/* Mobile Navigation Menu */}
      {menuOpen && (
      <div 
        ref={menuRef} 
        className="z-50 absolute top-14 left-0 w-full flex flex-col items-center bg-white shadow-md py-4 px-6 lg:hidden overflow-y-auto"
      >
      <ul className="flex flex-col items-center gap-4 w-full mb-1">
        
        {NavbarLinks.map((link, index) => (
          <li key={index}>
            {link.title === "Catalog" ? (
              <>
                <button
                  className="block w-full text-lg font-medium text-black text-center hover:bg-richblack-900 hover:text-yellow-300 hover:rounded-full hover:p-2"
                  onClick={() => setCatalogOpen((prev) => !prev)}
                >
                  {link.title}
                </button>
                {catalogOpen && (
                  <div className="w-full bg-gray-100 rounded-lg p-2 mt-2">
                    {loading ? (
                      <p className="text-center">Loading...</p>
                    ) : subLinks.length ? (
                      subLinks.map((subLink, i) => (
                        <Link
                          to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                          className="block text-center py-2 text-black hover:bg-richblack-900 hover:text-yellow-300 hover:rounded-full hover:p-2"
                          key={i}
                          onClick={() => {
                            setMenuOpen(false);
                            setCatalogOpen(false);
                          }}
                        >
                          {subLink.name}
                        </Link>
                      ))
                    ) : (
                      <p className="text-center">No Courses Found</p>
                    )}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={link.path}
                className="block w-full text-lg font-medium text-black text-center hover:bg-richblack-900 hover:text-yellow-300 hover:rounded-full hover:p-2"
                onClick={() => setMenuOpen(false)}
              >
                {link.title}
              </Link>
            )
            }
          </li>
        ))}
      </ul>
      {token === null && (
        <div className="flex flex-col items-center  w-full">
              <Link to="/login">
                <button onClick={() => setMenuOpen(false)} className="mb-2 w-28 h-9 text-lg text-richblack-900 font-medium hover:bg-richblack-900 hover:text-yellow-300 hover:rounded-full hover:p-2">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button onClick={() => setMenuOpen(false)} className="mb-2 w-28 h-9 text-lg  text-richblack-900 font-medium hover:bg-richblack-900 hover:text-yellow-300 hover:rounded-full hover:p-2">
                  Sign up
                </button>
              </Link>
        </div>
        )}
      {/* {token === null && (
        
      )} */}
      {token !== null && (
          <div className="flex flex-col items-center  w-full">
            <Link to="/dashboard/my-profile" onClick={() => setMenuOpen(false)}>
              <div className="w-28 h-9 flex items-center justify-center text-lg text-richblack-900 font-medium hover:bg-richblack-900 hover:text-yellow-300 hover:rounded-full hover:p-2">
                Dashboard
              </div>
            </Link>
            <div
              onClick={() => {
                dispatch(logout(navigate));
                setMenuOpen(false);
              }}
              className="w-28 h-9 flex items-center justify-center text-lg text-richblack-900 font-medium  cursor-pointer hover:bg-richblack-900 hover:text-yellow-300 hover:rounded-full hover:p-2"
            >
              Logout
            </div>
          </div>
      )}
    </div>
  )}

    </div>
  )
}

export default Navbar;