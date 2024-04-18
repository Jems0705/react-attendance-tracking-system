import { Button } from "@/components/ui/button";
import { useState } from "react";
import QRCode from "react-qr-code";

export default function Profile() {
    const [qrCodeData, setQrCodeData] = useState("");

    const generateQrCode = () => {
        const student = {
            id: "5a9427648b0beebeb69579e7",
            name: "John Doe",
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
