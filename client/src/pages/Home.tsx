import { useGetAuth } from "@/hooks/auth/useGetAuth";
import { Skeleton, Stack, Typography } from "@mui/material";

export default function Home() {
    const { data: authUser, isFetching } = useGetAuth();

    return (
        <Stack flex={1} height="100%">
            {isFetching ? (
                <Skeleton variant="text" width="100px" />
            ) : (
                <Typography variant="h4">
                    Hello, {authUser?.firstName}!
                </Typography>
            )}
            <Typography></Typography>
        </Stack>
    );
}
