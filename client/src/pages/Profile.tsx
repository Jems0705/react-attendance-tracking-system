import { Button } from "@/components/ui/button";
import { useState } from "react";
import QRCode from "react-qr-code";

export default function Profile() {
    const [qrCodeData, setQrCodeData] = useState("");

    const generateQrCode = () => {
        const student = {
            _id: "6623ad4f05c74c0611022b27",
            prn: "88763",
            name: "Student Test Doe",
        };
        setQrCodeData(JSON.stringify(student));
    };

    return (
        <div className="flex flex-col gap-1 ">
            <Button onClick={generateQrCode}>View my QR Code</Button>

            {qrCodeData && (
                <div className="bg-white p-16">
                    <QRCode value={qrCodeData} viewBox={`0 0 256 256`} />
                </div>
            )}
        </div>
    );
}
