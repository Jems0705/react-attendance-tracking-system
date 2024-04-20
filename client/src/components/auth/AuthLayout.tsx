import { Outlet } from "react-router-dom";

import authBg from "/auth-bg.jpg";

export const AuthLayout = () => {
    return (
        <main className="flex h-screen">
            <section className="flex flex-1 justify-center items-center flex-col py-10">
                <Outlet />
            </section>

            <img
                src={authBg}
                alt="image"
                className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
            />
        </main>
    );
};
