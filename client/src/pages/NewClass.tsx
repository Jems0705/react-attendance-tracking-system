import { ClassCreate } from "@/components/classes/ClassCreate";
import { ClassForm } from "@/components/classes/ClassForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NewClass() {
    return (
        <section className="flex flex-col gap-2">
            <div className=" rounded-md">
                <ClassCreate />
            </div>
        </section>
    );
}
