import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';

const BarcodeScanner = ({ onScanSuccess }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(onScanSuccess, console.error);

    return () => {
      scanner.clear().catch(console.error);
    };
  }, [onScanSuccess]);

  return <div id="reader" className="w-full"></div>;
};

export default BarcodeScanner;