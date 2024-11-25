import axios from 'axios';

export const generateExcelFile = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/generate-excel', {
            responseType: 'blob',
        });

        const file = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const fileURL = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = fileURL;

        const currentDate = new Date();
        const month = currentDate.toLocaleString('default', { month: 'long' });
        const fileName = `Shubham_Ele_item_rates_${month}.xlsx`;

        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error generating Excel:', error);
        alert('Failed to generate Excel. Please try again later.');
    }
};
