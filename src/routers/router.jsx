import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import Error from "../pages/Error.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import OpenRoute from "../components/core/Auth/OpenRoute.jsx";
import VerifyEmail from "../pages/VerifyEmail.jsx";
import UpdatePassword from "../pages/UpdatePassword.jsx";
import About from "../pages/About.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import PrivateRoute from "../components/core/Auth/PrivateRoute.jsx";
import MyProfile from "../components/core/Dashboard/MyProfile.jsx";
import Settings from "../components/core/Dashboard/Settings";
import EnrolledCourses from '../components/core/Dashboard/EnrolledCourses.jsx';
import Cart from "../components/core/Dashboard/Cart";
import MyCourses from '../components/core/Dashboard/MyCourses.jsx';
import AddCourse from "../components/core/Dashboard/AddCourse";
import Catalog from "../pages/Catalog";
import CourseDetails from "../pages/CourseDetails";
import VideoDetails from "../components/core/ViewCourse/VideoDetails";
import ViewCourse from "../pages/ViewCourse";
import Instructor from "../components/core/Dashboard/InstructorDashboard/Instructor";
import EditCourse from "../components/core/Dashboard/EditCourse/index.jsx";
import { ACCOUNT_TYPE } from "../utils/constants";
import Contact from '../pages/Contact.jsx';

const createRoutes = (user) =>
  createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "login",
          element: (
            <OpenRoute>
              <Login />
            </OpenRoute>
          ),
        },
        {
          path: "signup",
          element: (
            <OpenRoute>
              <Signup />
            </OpenRoute>
          ),
        },
        {
          path: "forgot-password",
          element: (
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          ),
        },
        {
          path: "verify-email",
          element: (
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          ),
        },
        {
          path: "update-password/:id",
          element: (
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          ),
        },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        {
          path: "dashboard",
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ),
          children: [
            { path: "my-profile", element: <MyProfile /> },
            { path: "settings", element: <Settings /> },
            ...(user?.accountType === ACCOUNT_TYPE.STUDENT
              ? [
                  { path: "cart", element: <Cart /> },
                  { path: "enrolled-courses", element: <EnrolledCourses /> },
                ]
              : []),
            ...(user?.accountType === ACCOUNT_TYPE.INSTRUCTOR
              ? [
                  { path: "instructor", element: <Instructor /> },
                  { path: "add-course", element: <AddCourse /> },
                  { path: "my-courses", element: <MyCourses /> },
                  { path: "edit-course/:courseId", element: <EditCourse /> },
                ]
              : []),
          ],
        },
        { path: "catalog/:catalogName", element: <Catalog /> },
        { path: "courses/:courseId", element: <CourseDetails /> },
        {
          path: "view-course/:courseId",
          element: (
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          ),
          children: [
            {
              path: "section/:sectionId/sub-section/:subSectionId",
              element: <VideoDetails />,
            },
          ],
        },
        { path: "*", element: <Error /> },
      ],
    },
  ]);

export default createRoutes;
