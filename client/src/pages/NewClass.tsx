import { ClassCreate } from "@/components/classes/ClassCreate";

export default function NewClass() {
    return (
        <section className="flex flex-col gap-2">
            <div className="rounded-md">
                <ClassCreate />
            </div>
        </section>
    );
}
