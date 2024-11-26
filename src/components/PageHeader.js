import React from 'react';
import Typography from '@mui/material/Typography';

const PageHeader = ({ title }) => {
    return (
        <Typography
            variant="h4"
            gutterBottom
            sx={{
                color: '#4CAF50',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
                fontWeight: 'bold',
                padding: '10px 20px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '5px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                border: '1px solid #4CAF50',
                display: 'inline-block',
                fontFamily: 'Roboto, sans-serif',
                textAlign: 'left',
                marginBottom: '30px',
            }}
        >
            {title}
        </Typography>
    );
};

export default PageHeader;
