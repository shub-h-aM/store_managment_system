import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

export const GenerateRateList = () => {
    const dom = document.getElementById('print');
    if (!dom) {
        console.error("Element with ID 'print' not found");
        return;
    }
    toPng(dom, { quality: 0.5 })
        .then((dataUrl) => {
            const img = new Image();
            img.crossOrigin = 'anonymous'; // Fixed typo
            img.src = dataUrl;
            img.onload = () => {
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'in',
                    format: [5.5, 8.5],
                });

                const imgProps = pdf.getImageProperties(img);
                const imageType = imgProps.fileType;
                // const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfWidth = pdf.internal.pageSize.getWidth();
                // const pdfWidth = imgProps.width / 2;
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
                    const imgYPosition = page === 0 ? 0 : -30;

                    const w = pageCanvas.width;
                    const h = pageCanvas.height;
                    pageCtx.fillStyle = 'white';
                    pageCtx.fillRect(0, 0, w, h);
                    pageCtx.drawImage(img, 0, page * pxPageHeight + imgYPosition, w, h, 0, 0, w, h);

                    if (page) pdf.addPage();

                    const imgData = pageCanvas.toDataURL(`image/${imageType}`, 1);
                    pdf.addImage(imgData, imageType, 0, 0, pdfWidth, pageHeight);
                }
                pdf.save(`Item-Rate-List-0001.pdf`);
            };
        })
        .catch((error) => {
            console.error('Oops, something went wrong!', error);
            alert("Not Able to Download File!");
        });
};
