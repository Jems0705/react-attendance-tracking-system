import { useGetClass } from "@/hooks/class/useGetClass";
import { useParams } from "react-router-dom";

export const ClassInfo = () => {
    const { classId } = useParams();

    const { data: _class } = useGetClass({ classId: classId as string });
    return <div>ClassInfo</div>;
};
