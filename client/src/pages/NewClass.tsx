import { ClassForm } from "@/components/classes/ClassForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NewClass() {
    return (
        <section className="flex flex-col gap-2">
            <div>
                <Link to="/classes">
                    <Button variant="outline" size="icon">
                        <ArrowLeft />
                    </Button>
                </Link>
            </div>

            <div className="p-10 rounded-md">
                <ClassForm />
            </div>
        </section>
    );
}
