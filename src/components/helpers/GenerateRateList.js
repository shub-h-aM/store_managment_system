import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

export const GenerateRateList = () => {
    const dom = document.getElementById('print');
    if (!dom) {
        console.error('Element with ID \'print\' not found');
        return;
    }
    toPng(dom, { quality: 0.5 })
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
                const topGap = 0.3; // Gap in inches above the first row on new pages

                // Calculate the number of pages.
                const pxFullHeight = imgProps.height;
                const pxPageHeight = Math.floor((imgProps.width * 8.5) / 5.5);
                const nPages = Math.ceil(pxFullHeight / pxPageHeight);
                let pageHeight = pdf.internal.pageSize.getHeight();
                const currentDate = new Date();
                const month = currentDate.toLocaleString('default', { month: 'long' });
                const fileNames = `Shubham_Ele_item_rates_${month}.pdf`;

                // Create a one-page canvas to split up the full image.
                const pgCanvas = document.createElement('canvas');
                const pageCtx = pgCanvas.getContext('2d');
                pgCanvas.width = imgProps.width;
                pgCanvas.height = pxPageHeight;

                for (let page = 0; page < nPages; page++) {
                    // Trim the final page to reduce file size.
                    if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
                        pgCanvas.height = pxFullHeight % pxPageHeight;
                        pageHeight = (pgCanvas.height * pdfWidth) / pgCanvas.width;
                    }

                    const w = pgCanvas.width;
                    const h = pgCanvas.height;
                    pageCtx.fillStyle = 'white';
                    pageCtx.fillRect(0, 0, w, h);
                    pageCtx.drawImage(img, 0, page * pxPageHeight, w, h, 0, 0, w, h);

                    if (page) pdf.addPage();

                    // Compress the image to reduce file size
                    const imgData = pgCanvas.toDataURL('image/jpeg', 0.7); // Adjust quality (0.0 - 1.0)
                    const yOffset = page ? topGap : 0; // Apply gap above the first row on new pages
                    pdf.addImage(imgData, 'JPEG', 0, yOffset, pdfWidth, pageHeight - yOffset);
                }

                // Save the PDF
                pdf.save(fileNames);
            };
        })
        .catch((error) => {
            console.error('Oops, something went wrong!', error);
            alert('Not Able to Download File!');
        });
};
