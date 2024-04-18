import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";

export default function Scan() {
    return (
        <div className="flex flex-col">
            <div className="flex gap-1">
                <Button>
                    <Link to="/attendance/scan/clock-in">Clock In</Link>
                </Button>
                <Button>
                    <Link to="/attendance/scan/clock-out">Clock Out</Link>
                </Button>
            </div>
            <section>
                <Outlet />
            </section>
        </div>
    );
}
