import { Button } from "@/components/ui/button";
import roles from "@/data/roles";
import { useGetAuth } from "@/hooks/auth/useGetAuth";
import { Typography } from "@mui/material";
import { useState } from "react";
import QRCode from "react-qr-code";

export default function Profile() {
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

    return (
        <div className="flex flex-col gap-1 ">
            <Typography>{authUser?.role}</Typography>
            {authUser?.role === roles.STUDENT && (
                <Button onClick={generateQrCode}>View my QR Code</Button>
            )}

            {qrCodeData && (
                <div className="bg-white p-16">
                    <QRCode value={qrCodeData} viewBox={`0 0 256 256`} />
                </div>
            )}
        </div>
    );
}
