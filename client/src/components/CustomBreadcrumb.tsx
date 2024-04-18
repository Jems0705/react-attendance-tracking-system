import { Link, useLocation } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "./ui/breadcrumb";
import { useGetPaths } from "@/hooks/useGetPaths";
import { Fragment } from "react/jsx-runtime";

export const CustomBreadcrumb = () => {
    const { paths, currentPath } = useGetPaths();

    return (
        <div>
            <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                    {paths &&
                        paths.map((path, index) => {
                            return (
                                <Fragment key={path}>
                                    <BreadcrumbItem>
                                        {path === currentPath ? (
                                            <BreadcrumbPage className="capitalize">
                                                {path.replace("-", " ")}
                                            </BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink
                                                asChild
                                                className="capitalize"
                                            >
                                                <Link to="#">
                                                    {path.replace("-", " ")}
                                                </Link>
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>

                                    {index !== paths.length - 1 && (
                                        <BreadcrumbSeparator />
                                    )}
                                </Fragment>
                            );
                        })}

                    {/* <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="#">Orders</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Recent Orders</BreadcrumbPage>
                    </BreadcrumbItem> */}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
};
