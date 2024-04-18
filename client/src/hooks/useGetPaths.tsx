import { useLocation } from "react-router-dom";

export const useGetPaths = () => {
    const { pathname } = useLocation();

    const paths = pathname.split("/").filter((path) => path);

    const currentPath = paths[paths.length - 1];

    return { paths, currentPath };
};
