import { Button } from "@/components/ui/button";

export default function Attendance() {
    return (
        <div className="flex gap-1">
            <Button variant="default">Time in</Button>
            <Button variant={"destructive"}>Time out</Button>
        </div>
    );
}
