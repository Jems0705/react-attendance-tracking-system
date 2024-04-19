import { CircularProgress, Stack } from "@mui/material";

export const FullLoader = () => {
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="100vh"
        >
            <CircularProgress />
        </Stack>
    );
};
