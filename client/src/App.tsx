import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { Suspense, lazy } from "react";
import { AuthContextProvider } from "./contexts/auth/AuthContext";
import { ProtectedRoute } from "./hooks/auth/ProtectedRoute";
import { PageLayout } from "./components/PageLayout";

const LoginPage = lazy(() => import("@/pages/Login"));
const RegisterPage = lazy(() => import("@/pages/Register"));

const DashboardPage = lazy(() => import("@/pages/Dashboard"));
const ClassesPage = lazy(() => import("@/pages/Classes"));
const NewClassPage = lazy(() => import("@/pages/NewClass"));
const StudentsPage = lazy(() => import("@/pages/Students"));
const AttendancePage = lazy(() => import("@/pages/Attendance"));
const ScanPage = lazy(() => import("@/pages/Scan"));
const ClockInPage = lazy(() => import("@/pages/ClockIn"));
const ClockOutPage = lazy(() => import("@/pages/ClockOut"));
const ProfilePage = lazy(() => import("@/pages/Profile"));
const SettingsPage = lazy(() => import("@/pages/Settings"));

const router = createBrowserRouter([
    {
        path: "/login",
        element: (
            <Suspense fallback={<>Loading...</>}>
                <LoginPage />
            </Suspense>
        ),
    },
    {
        path: "/register",
        element: (
            <Suspense fallback={<>Loading...</>}>
                <RegisterPage />
            </Suspense>
        ),
    },
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            {
                element: <PageLayout />,
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense fallback={<>Loading...</>}>
                                <DashboardPage />
                            </Suspense>
                        ),
                    },
                    {
                        path: "/classes",
                        element: (
                            <Suspense fallback={<>Loading...</>}>
                                <ClassesPage />
                            </Suspense>
                        ),
                        children: [
                            {
                                path: "new",
                                element: (
                                    <Suspense fallback={<>Loading...</>}>
                                        <NewClassPage />
                                    </Suspense>
                                ),
                            },
                        ],
                    },
                    {
                        path: "/students",
                        element: (
                            <Suspense fallback={<>Loading...</>}>
                                <StudentsPage />
                            </Suspense>
                        ),
                    },
                    {
                        path: "/attendance",
                        element: (
                            <Suspense fallback={<>Loading...</>}>
                                <AttendancePage />
                            </Suspense>
                        ),
                        children: [
                            {
                                path: "scan",
                                element: (
                                    <Suspense fallback={<>Loading...</>}>
                                        <ScanPage />
                                    </Suspense>
                                ),
                                children: [
                                    {
                                        path: "clock-in",
                                        element: (
                                            <Suspense
                                                fallback={<>Loading...</>}
                                            >
                                                <ClockInPage />
                                            </Suspense>
                                        ),
                                    },
                                    {
                                        path: "clock-out",
                                        element: (
                                            <Suspense
                                                fallback={<>Loading...</>}
                                            >
                                                <ClockOutPage />
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
                            <Suspense fallback={<>Loading...</>}>
                                <ProfilePage />
                            </Suspense>
                        ),
                    },
                    {
                        path: "/settings",
                        element: (
                            <Suspense fallback={<>Loading...</>}>
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
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
