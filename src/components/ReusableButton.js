import React from 'react';
import Button from '@mui/material/Button';

const ReusableButton = ({ variant, color, onClick, label, type = 'button', fullWidth = false }) => {
    return (
        <Button
            variant={variant}
            color={color}
            onClick={onClick}
            type={type}
            fullWidth={fullWidth}
            sx={{
                py: 1.5,
                borderRadius: 3,
                fontWeight: 'bold',
                fontSize: '16px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s ease, transform 0.3s ease',
                '&:hover': {
                    backgroundImage: 'linear-gradient(to right, #81C784, #4CAF50)',
                    color: 'white',
                },
                '&:active': {
                    transform: 'scale(0.98)',
                },
            }}
        >
            {label}
        </Button>
    );
};

export default ReusableButton;
