import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Suspense, lazy } from "react";
import { ProtectedRoute } from "./hooks/auth/ProtectedRoute";
import { PageLayout } from "./components/PageLayout";
import ThemeProvider from "./themes/ThemeProvider";
import { SidebarProvider } from "./contexts/SidebarProvider";
import { FullLoader } from "./components/shared/FullLoader";
import { AllowedRoles } from "./components/auth/AllowedRoles";
import roles from "./data/roles";
import { AuthLayout } from "./components/auth/AuthLayout";

const LoginPage = lazy(() => import("@/pages/Login"));
const RegisterPage = lazy(() => import("@/pages/Register"));

const DashboardPage = lazy(() => import("@/pages/Dashboard"));
const ClassesPage = lazy(() => import("@/pages/Classes"));
const ClassPage = lazy(() => import("@/pages/Class"));
const ClassEditPage = lazy(() => import("@/pages/ClassEdit"));
const NewClassPage = lazy(() => import("@/pages/NewClass"));
const StudentsPage = lazy(() => import("@/pages/Students"));
const StudentPage = lazy(() => import("@/pages/Student"));
const AttendancePage = lazy(() => import("@/pages/Attendance"));
const ScanPage = lazy(() => import("@/pages/Scan"));
const ClockInPage = lazy(() => import("@/pages/ClockIn"));
const ClockOutPage = lazy(() => import("@/pages/ClockOut"));
const ProfilePage = lazy(() => import("@/pages/Profile"));
const SettingsPage = lazy(() => import("@/pages/Settings"));

const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            {
                path: "/login",
                element: (
                    <Suspense fallback={<FullLoader />}>
                        <LoginPage />
                    </Suspense>
                ),
            },
            {
                path: "/register",
                element: (
                    <Suspense fallback={<FullLoader />}>
                        <RegisterPage />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            {
                element: (
                    <SidebarProvider>
                        <PageLayout />
                    </SidebarProvider>
                ),
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense fallback={<FullLoader />}>
                                <DashboardPage />
                            </Suspense>
                        ),
                    },
                    {
                        path: "dashboard",
                        element: (
                            <Suspense fallback={<FullLoader />}>
                                <DashboardPage />
                            </Suspense>
                        ),
                    },
                    {
                        path: "/classes",
                        element: (
                            <Suspense fallback={<FullLoader />}>
                                <AllowedRoles
                                    type="page"
                                    roles={[roles.TEACHER, roles.STUDENT]}
                                >
                                    <ClassesPage />
                                </AllowedRoles>
                            </Suspense>
                        ),
                        children: [
                            {
                                path: "new",
                                element: (
                                    <Suspense fallback={<FullLoader />}>
                                        {/* add alsoadmin if available */}
                                        <AllowedRoles
                                            type="page"
                                            roles={[roles.TEACHER]}
                                        >
                                            <NewClassPage />
                                        </AllowedRoles>
                                    </Suspense>
                                ),
                            },
                            {
                                path: ":classId",
                                element: (
                                    <Suspense fallback={<FullLoader />}>
                                        <ClassPage />
                                    </Suspense>
                                ),
                            },
                            {
                                path: ":classId/edit",
                                element: (
                                    <Suspense fallback={<FullLoader />}>
                                        <AllowedRoles
                                            type="page"
                                            roles={[roles.TEACHER]}
                                        >
                                            <ClassEditPage />
                                        </AllowedRoles>
                                    </Suspense>
                                ),
                            },
                        ],
                    },
                    {
                        path: "/students",
                        element: (
                            <Suspense fallback={<FullLoader />}>
                                <AllowedRoles
                                    type="page"
                                    roles={[roles.TEACHER]}
                                >
                                    <StudentsPage />
                                </AllowedRoles>
                            </Suspense>
                        ),
                        children: [
                            {
                                path: ":studentId",
                                element: (
                                    <Suspense fallback={<FullLoader />}>
                                        <AllowedRoles
                                            type="page"
                                            roles={[roles.TEACHER]}
                                        >
                                            <StudentPage />
                                        </AllowedRoles>
                                    </Suspense>
                                ),
                            },
                        ],
                    },
                    {
                        path: "/attendance",
                        element: (
                            <Suspense fallback={<FullLoader />}>
                                <AllowedRoles
                                    type="page"
                                    roles={[roles.TEACHER]}
                                >
                                    <AttendancePage />
                                </AllowedRoles>
                            </Suspense>
                        ),
                        children: [
                            {
                                path: "scan",
                                element: (
                                    <Suspense fallback={<FullLoader />}>
                                        <AllowedRoles
                                            type="page"
                                            roles={[roles.TEACHER]}
                                        >
                                            <ScanPage />
                                        </AllowedRoles>
                                    </Suspense>
                                ),
                                children: [
                                    {
                                        path: "clock-in",
                                        element: (
                                            <Suspense fallback={<FullLoader />}>
                                                <AllowedRoles
                                                    type="page"
                                                    roles={[roles.TEACHER]}
                                                >
                                                    <ClockInPage />
                                                </AllowedRoles>
                                            </Suspense>
                                        ),
                                    },
                                    {
                                        path: "clock-out",
                                        element: (
                                            <Suspense fallback={<FullLoader />}>
                                                <AllowedRoles
                                                    type="page"
                                                    roles={[roles.TEACHER]}
                                                >
                                                    <ClockOutPage />
                                                </AllowedRoles>
                                            </Suspense>
                                        ),
                                    },
                                ],
                            },
                        ],
                    },

                    {
                        path: "/profile",
                        element: (
                            <Suspense fallback={<FullLoader />}>
                                <ProfilePage />
                            </Suspense>
                        ),
                    },
                    {
                        path: "/settings",
                        element: (
                            <Suspense fallback={<FullLoader />}>
                                <SettingsPage />
                            </Suspense>
                        ),
                    },
                ],
            },
        ],
    },
]);

function App() {
    return (
        <ThemeProvider>
            <RouterProvider router={router} />
            <Toaster />
        </ThemeProvider>
    );
}

export default App;
