import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/Registration/SignUp";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import CreateNote from "../Components/Student Dashboard/CreateNote";
import ManagePersonalNotes from "../Components/Student Dashboard/ManagePersonalNotes";
import ViewBookedSessions from "../Components/Student Dashboard/ViewBookedSessions";
import ViewStudyMaterials from "../Components/Student Dashboard/ViewStudyMaterials";
import PrivateRoute from "../Private/PrivateRoute";
import CreateStudySession from "../Components/Tutor Dashboard/CreateStudySession";
import ViewAllStudySession from "../Components/Tutor Dashboard/ViewAllStudySession";
import ErrorPage from "../Common/ErrorPage";
import UploadMeterials from "../Components/Tutor Dashboard/UploadMeterials";
import ViewAllMeterials from "../Components/Tutor Dashboard/ViewAllMeterials";
import ViewAllUsers from "../Components/Admin Dashboard/ViewAllUsers";
import AboutUs from "../Pages/AboutUs";
import ViewAllStudySessionA from "../Components/Admin Dashboard/ViewAllStudySessionA";
import ViewAllMaterials from "../Components/Tutor Dashboard/ViewAllMeterials";
import ViewAllMaterialsA from "../Components/Admin Dashboard/ViewAllMaterialsA";
import Payment from "../Components/Admin Dashboard/Payment/Payment";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/aboutUs',
                element: <AboutUs></AboutUs>
            },

        ]
    },

    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,


        children: [

            // student
            {
                path: 'create-note',
                element: <CreateNote></CreateNote>
            },
            {
                path: 'manage-notes',
                element: <ManagePersonalNotes></ManagePersonalNotes>
            },
            {
                path: 'view-booked-session',
                element: <ViewBookedSessions></ViewBookedSessions>
            },
            {
                path: 'view-study-meterials',
                element: <ViewStudyMaterials></ViewStudyMaterials>
            },


            // tutor 
            {
                path: 'create-study-session',
                element: <CreateStudySession></CreateStudySession>
            },
            {
                path: 'view-all-study-session',
                element: <ViewAllStudySession></ViewAllStudySession>
            },
            {
                path: 'upload-materials',
                element: <UploadMeterials></UploadMeterials>
            },
            {
                path: 'view-all-materials',
                element: <ViewAllMeterials></ViewAllMeterials>
            },

            // admin
            {
                path: 'view-all-users',
                element: <ViewAllUsers></ViewAllUsers>
            },
            {
                path: 'view-all-study-sessionA',
                element: <ViewAllStudySessionA></ViewAllStudySessionA>
            },
            {
                path: 'view-all-materialsA',
                element: <ViewAllMaterialsA></ViewAllMaterialsA>
            },
            {
                path: 'payment',
                element: <Payment></Payment>
            },
        ]
    },
]);

export default router;
