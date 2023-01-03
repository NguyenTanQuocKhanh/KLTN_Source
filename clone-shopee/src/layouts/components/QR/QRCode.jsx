import QRCode from 'qrcode.react';

function QR({ value = window.location.href, renderAs = 'canvas', size, className }) {
    return <QRCode value={value} renderAs={renderAs} size={size} className={className} />;
}

export default QR;
