import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";

export default function Scan() {
    return (
        <div className="flex flex-col">
            <div className="flex gap-1">
                <Link to="/attendance/scan/clock-in">
                    <Button>Clock In</Button>
                </Link>

                <Link to="/attendance/scan/clock-out">
                    <Button>Clock Out</Button>
                </Link>
            </div>
            <section>
                <Outlet />
            </section>
        </div>
    );
}
