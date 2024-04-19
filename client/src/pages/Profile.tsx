import roles from "@/data/roles";
import { useGetAuth } from "@/hooks/auth/useGetAuth";
import { Box, Button, Stack, Typography } from "@mui/material";
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
        <div className="flex flex-col gap-1 ">
            <Typography>{authUser?.role}</Typography>
            {authUser?.role === roles.STUDENT && (
                <Button variant="contained" onClick={generateQrCode}>
                    View my QR Code
                </Button>
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
        </div>
    );
}
