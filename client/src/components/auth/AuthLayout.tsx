import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
    return (
        <main className="flex h-screen">
            <section className="flex flex-1 justify-center items-center flex-col py-10">
                <Outlet />
            </section>

            <img
                src="/assets/images/side-img.svg"
                alt="logo"
                className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
            />
        </main>
    );
};
