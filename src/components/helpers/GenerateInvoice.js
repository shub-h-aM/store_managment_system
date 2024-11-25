import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

export const GenerateInvoice = (invoiceNumber) => {
    const dom = document.getElementById('print');
    if (!dom) {
        console.error('Element with ID \'print\' not found');
        return;
    }

    toPng(dom)
        .then((dataUrl) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = dataUrl;
            img.onload = () => {
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'in',
                    format: [5.5, 8.5],
                });

                const imgProps = pdf.getImageProperties(img);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const topGap = 0.2;

                const pxFullHeight = imgProps.height;
                const pxPageHeight = Math.floor((imgProps.width * 8.5) / 5.5);
                const nPages = Math.ceil(pxFullHeight / pxPageHeight);

                let pageHeight = pdf.internal.pageSize.getHeight();

                const pageCanvas = document.createElement('canvas');
                const pageCtx = pageCanvas.getContext('2d');
                pageCanvas.width = imgProps.width;
                pageCanvas.height = pxPageHeight;

                for (let page = 0; page < nPages; page++) {
                    if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
                        pageCanvas.height = pxFullHeight % pxPageHeight;
                        pageHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width;
                    }

                    const w = pageCanvas.width;
                    const h = pageCanvas.height;
                    pageCtx.fillStyle = 'white';
                    pageCtx.fillRect(0, 0, w, h);
                    pageCtx.drawImage(img, 0, page * pxPageHeight, w, h, 0, 0, w, h);

                    if (page) {
                        pdf.addPage();
                    }

                    const imgData = pageCanvas.toDataURL('image/jpeg', 0.7);
                    const yOffset = page ? topGap : 0;
                    pdf.addImage(imgData, 'JPEG', 0, yOffset, pdfWidth, pageHeight - yOffset);
                }

                pdf.save(`invoice-${invoiceNumber}.pdf`);
            };
        })
        .catch((error) => {
            console.error('Oops, something went wrong!', error);
        });
};
