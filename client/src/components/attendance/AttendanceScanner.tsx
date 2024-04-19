import { FC, useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useClockIn } from "@/hooks/attendance/useClockIn";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { useGetClasses } from "@/hooks/class/useGetClasses";
import { useClockOut } from "@/hooks/attendance/useClockOut";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { Autocomplete, TextField } from "@mui/material";

type AttendanceScannerProps = {
    type: "in" | "out";
};

export const AttendanceScanner: FC<AttendanceScannerProps> = ({ type }) => {
    const queryClient = useQueryClient();

    const [value, setValue] = useState("");

    const { data: classes } = useGetClasses();

    console.log("classes", classes);

    const { mutate: clockIn } = useClockIn();
    const { mutate: clockOut } = useClockOut();

    useEffect(() => {
        let scanner: Html5QrcodeScanner;

        const onSuccess = (student: string) => {
            if (type === "in") {
                clockIn(
                    { student, classId: value },
                    {
                        onSuccess: () => {
                            // setValue("");
                            queryClient.invalidateQueries({
                                queryKey: ["attendance"],
                            });
                            toast.success("Clocked " + type, {
                                duration: 5000,
                            });
                        },
                        onError: (err) => {
                            if (axios.isAxiosError(err)) {
                                toast.error(err.response?.data.message, {
                                    duration: 5000,
                                });
                            }
                            // setValue("");
                        },
                        onSettled: () => {
                            // setValue("");
                        },
                    }
                );
            }

            if (type === "out") {
                clockOut(
                    { student, classId: value },
                    {
                        onSuccess: () => {
                            // setValue("");
                            queryClient.invalidateQueries({
                                queryKey: ["attendance"],
                            });
                            toast.success("Clocked " + type, {
                                duration: 5000,
                            });
                        },
                        onError: (err) => {
                            if (axios.isAxiosError(err)) {
                                toast.error(err.response?.data.message, {
                                    duration: 5000,
                                });
                            }
                            // setValue("");
                        },
                        onSettled: () => {
                            // setValue("");
                        },
                    }
                );
            }

            // scanner.clear();
        };

        const onError = () => {};

        if (value) {
            scanner = new Html5QrcodeScanner(
                "reader",
                {
                    qrbox: {
                        width: 350,
                        height: 350,
                    },
                    fps: 5,
                },
                false
            );

            scanner.render(onSuccess, onError);
        }

        return () => {
            if (value) {
                scanner.clear();
            }
        };
    }, [value, type]);

    return (
        <div className="flex flex-col gap-2 py-4">
            <Autocomplete
                value={value}
                onChange={(_e, value) => {
                    setValue(value as string);
                }}
                options={classes ? classes.map((_class) => _class._id) : []}
                getOptionLabel={(option) => {
                    const optionLabel =
                        classes &&
                        classes.find((_class) => _class._id === option);

                    if (!optionLabel) return "";

                    return optionLabel.name;
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Select class..."
                    />
                )}
            />
            {/* <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                    >
                        {value
                            ? classes?.find((myClass) => myClass._id === value)
                                  ?.name
                            : "Select class"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search framework..." />
                        <CommandList>
                            <CommandEmpty>No class found.</CommandEmpty>
                            <CommandGroup>
                                {classes?.map((myClass) => (
                                    <CommandItem
                                        key={myClass._id}
                                        value={myClass._id}
                                        onSelect={(currentValue) => {
                                            setValue(
                                                currentValue === value
                                                    ? ""
                                                    : currentValue
                                            );
                                            setOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === myClass._id
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                        {myClass.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover> */}

            {value && (
                <div id="reader" className="w-[500px]">
                    Clock In
                </div>
            )}
        </div>
    );
};
