import * as XLSX from 'xlsx';

const readHeadersFromFile = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error('No file provided'));
            return;
        }

        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const headers = [];
            for (const key in worksheet) {
                if (key[0] === '!') continue;
                headers.push(key);
                break; // Assuming headers are in the first row only
            }
            resolve(headers);
        };
        reader.onerror = (error) => {
            reject(error);
        };
    });
};

const getHeadersFromUploadedFile = async (file) => {
    try {
        const headers = await readHeadersFromFile(file);
        return headers;
    } catch (error) {
        console.error('Error reading headers from file:', error);
        return [];
    }
};

export { getHeadersFromUploadedFile };
