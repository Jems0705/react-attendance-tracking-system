import { ClassFormSchemaType, classFormSchema } from "@/schema/classFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Check } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../ui/command";

// import { Dropdown } from "semantic-ui-react";
import { useCreateClass } from "@/hooks/class/useCreateClass";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useGetTeachers } from "@/hooks/teacher/useGetTeachers";
import { useGetStudents } from "@/hooks/student/useGetStudents";

export const ClassForm = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: createClass } = useCreateClass();

    const { data: teachers } = useGetTeachers();
    const { data } = useGetStudents();

    console.log("students", data);

    const students = [
        { value: "23123wdawdasdwrasdasd", text: "Student 1" },
        { value: "gdfw412asdasdasdad", text: "Student 2" },
        { value: "qweas", text: "Student 3" },
        { value: "asddfsdf", text: "Student 4" },
        { value: "gdfw412dasdasdasdasdad", text: "Student 5" },
    ];

    const form = useForm<ClassFormSchemaType>({
        defaultValues: {
            name: "",
            teacher: "",
            students: [],
        },
        resolver: zodResolver(classFormSchema),
    });

    const onSubmit = (values: ClassFormSchemaType) => {
        console.log("values", values);

        createClass(values, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["classes"] });

                navigate("/classes");
            },
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Section A - Subject"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="teacher"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Teacher</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-[200px] justify-between",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? teachers?.find(
                                                      (teacher) =>
                                                          teacher._id ===
                                                          field.value
                                                  )?.name
                                                : "Select teacher"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search teacher..." />

                                        <CommandList>
                                            <CommandEmpty>
                                                No teacher found.
                                            </CommandEmpty>
                                            <CommandGroup>
                                                {teachers?.map((teacher) => {
                                                    return (
                                                        <CommandItem
                                                            value={teacher._id}
                                                            key={teacher._id}
                                                            onSelect={() => {
                                                                form.setValue(
                                                                    "teacher",
                                                                    teacher._id
                                                                );
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    teacher._id ===
                                                                        field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                            {teacher.name}
                                                        </CommandItem>
                                                    );
                                                })}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* <FormField
                    control={form.control}
                    name="students"
                    render={({ field }) => {
                        return (
                            <FormItem className="flex flex-col">
                                <Dropdown
                                    {...field}
                                    placeholder="Students"
                                    onChange={(_e, data) =>
                                        field.onChange(data.value)
                                    }
                                    fluid
                                    multiple
                                    search
                                    selection
                                    options={students}
                                />
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                /> */}

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};
