import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function ClockIn() {
    useEffect(() => {
        const onSuccess = (result: string) => {
            console.log("result", result);

            scanner.clear();
        };

        const onError = () => {};
        const scanner = new Html5QrcodeScanner(
            "reader",
            {
                qrbox: {
                    width: 250,
                    height: 250,
                },
                fps: 5,
            },
            false
        );

        scanner.render(onSuccess, onError);

        return () => {
            scanner.clear();
        };
    }, []);
    return <div id="reader">Clock In</div>;
}
