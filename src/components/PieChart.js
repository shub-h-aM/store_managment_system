import React, { useEffect, useState } from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const sizing = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    legend: { hidden: true },
};
const PieChartWithCustomizedLabel = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:5000/api/item');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const itemData = await response.json();
                // Remove the first row (header) from the data
                const dataWithoutHeader = itemData.slice(1);
                // Create a map to count the occurrences of each unique combination of labels
                const itemCounts = new Map();
                dataWithoutHeader.forEach(row => {
                    const label = row.join(', '); // Combine all columns into a single label
                    itemCounts.set(label, (itemCounts.get(label) || 0) + 1);
                });
                // Format data for PieChart
                const formattedData = [...itemCounts.entries()].map(([label, count]) => ({
                    label: `${label} (${count})`,
                    value: count
                }));

                console.log('Formatted Data:', formattedData); // Log formatted data

                setData(formattedData);
            } catch (error) {
                console.error('Error fetching item data:', error.message);
            }
        }
        fetchData();
    }, []);

    console.log('Data:', data); // Log the data to check if it's populated correctly

    const getArcLabel = (params) => {
        const total = data.reduce((acc, item) => acc + item.value, 0);
        const percent = (params.value / total) * 100;
        return `${params.label}: ${percent.toFixed(0)}%`;
    };

    return (
        <PieChart
            series={[
                {
                    outerRadius: 80,
                    data,
                    arcLabel: getArcLabel,
                },
            ]}
            sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                    fill: 'white',
                    fontSize: 14,
                },
            }}
            {...sizing}
        />
    );
};




export default PieChartWithCustomizedLabel;
