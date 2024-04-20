import roles from "@/data/roles";
import { useGetAuth } from "@/hooks/auth/useGetAuth";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useRef, useState } from "react";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";

export default function Profile() {
    const qrCodeElementRef = useRef(null);
    const { data: authUser } = useGetAuth();

    const [qrCodeData, setQrCodeData] = useState("");

    const generateQrCode = () => {
        const student = {
            _id: authUser?._id,
            lrn: authUser?.lrn,
            name: `${authUser?.firstName} ${authUser?.lastName}`,
        };
        setQrCodeData(JSON.stringify(student));
    };

    const downloadImage = async () => {
        if (!qrCodeElementRef.current) return;

        try {
            const dataURL = await toPng(qrCodeElementRef.current);

            const link = document.createElement("a");
            link.href = dataURL;
            link.download = "myQrCode.png";
            link.click();
        } catch (error) {
            console.error("Error converting element to image:", error);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <Stack>
                <Paper
                    sx={{
                        p: "16px 32px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                    }}
                    elevation={2}
                >
                    <Typography variant="h6">My Profile</Typography>
                    <Stack gap="8px">
                        <Stack gap="4px">
                            <Typography variant="caption" fontWeight={700}>
                                Name
                            </Typography>
                            <Typography variant="subtitle2">
                                {`${authUser?.firstName} ${authUser?.lastName}`}
                            </Typography>
                        </Stack>

                        {authUser?.lrn && (
                            <Stack gap="4px">
                                <Typography variant="caption" fontWeight={700}>
                                    LRN
                                </Typography>
                                <Typography variant="subtitle2">
                                    {authUser?.lrn}
                                </Typography>
                            </Stack>
                        )}

                        <Stack gap="4px">
                            <Typography variant="caption" fontWeight={700}>
                                Email
                            </Typography>
                            <Typography variant="subtitle2">
                                {authUser?.email}
                            </Typography>
                        </Stack>
                    </Stack>
                </Paper>
            </Stack>

            {authUser?.role === roles.STUDENT && (
                <Paper
                    sx={{
                        p: "16px 32px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                    }}
                    elevation={2}
                >
                    {authUser?.role === roles.STUDENT && !qrCodeData && (
                        <Box>
                            <Button
                                variant="contained"
                                onClick={generateQrCode}
                            >
                                View my QR Code
                            </Button>
                        </Box>
                    )}

                    {qrCodeData && (
                        <>
                            <Box>
                                <Box
                                    ref={qrCodeElementRef}
                                    sx={{
                                        bgcolor: "common.white",
                                        p: "64px",
                                        display: "inline-flex",
                                    }}
                                >
                                    <QRCode
                                        value={qrCodeData}
                                        viewBox={`0 0 256 256`}
                                    />
                                </Box>
                            </Box>

                            <Button variant="contained" onClick={downloadImage}>
                                Download QR Code
                            </Button>
                        </>
                    )}
                </Paper>
            )}
        </div>
    );
}
