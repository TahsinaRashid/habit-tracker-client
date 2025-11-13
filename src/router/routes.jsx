import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import BrowseAllHabit from "../pages/BrowseAllHabit";
import Profile from "../pages/Profile";
import PrivateRoute from "./PrivateRoute";
import AddHabit from "../pages/AddHabit";
import HabitDetails from "../pages/HabitDetails";
import MyHabit from "../pages/MyHabit";
import MyDownloads from "../pages/MyDownloads";
import UpdateHabit from "../pages/UpdateHabit";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Registration";
import ErrorPage from "../pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch('https://3d-model-server.vercel.app/latest-models')
      },
      {
        path: "/browse-all-habit",
        element: <BrowseAllHabit />,
        loader: () => fetch('http://localhost:7000/addHabit')
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-habit",
        element: (
          <PrivateRoute>
            <AddHabit />
          </PrivateRoute>
        ),
      },
      {
        path: "/habit-details/:id",
        element: (
          <PrivateRoute>
            <HabitDetails />
          </PrivateRoute>
        ),
      },

       {
        path: "/my-habit",
        element: (
          <PrivateRoute>
            <MyHabit />
          </PrivateRoute>
        ),
      },

       {
        path: "/my-downloads",
        element: (
          <PrivateRoute>
            <MyDownloads />
          </PrivateRoute>
        ),
      },

        {
        path: "/update-Habit/:id",
        element: (
          <PrivateRoute>
            <UpdateHabit />
          </PrivateRoute>
        ),
          loader: ({params}) => fetch(`https://3d-model-server.vercel.app/models/${params.id}`)
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },
  {
    path: '/*',
    Component: ErrorPage , 
    
  },
]);