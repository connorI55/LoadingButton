import React from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import TimerComp from './timerComp';
import { timerProps } from './timerComp';
import Grow from '@mui/material/Grow';
import Box from '@mui/material/Box';
import Zoom from '@mui/material/Zoom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';



export interface ButtonProps {
    buttonText: string;
    buttonStyle: "text" | "outlined" | "contained";
    buttonSize: "small" | "medium" | "large";
    cancelSeconds: number;
    onClick: () => void;
    icon?: React.ReactNode;
    iconPosition: "start" | "end";
  }

const LongPressButton: React.FC<ButtonProps> = ({ buttonText, buttonStyle, buttonSize, cancelSeconds, onClick, icon, iconPosition }) => {

    //add state to manage button state
    const [isPressed, setIsPressed] = React.useState(false);
    const [isComplete, setIsComplete] = React.useState(false);
    const handleClick = () => {
        setIsPressed(true);
    };
    const handleIconClick = () => {
        setIsPressed(false);
    };
    const onComplete = () => {
        setIsComplete(true);
        // You can also add any other state changes or actions here
    };

    //const for timer props
    const timerProps: timerProps = {
        active: isPressed,
        cancelSeconds: cancelSeconds,
        icon: icon,
        onClick: handleIconClick,
        onComplete: onComplete
    };

    return (
        <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <Zoom in={!isPressed}>
            <Box sx={{ position: 'absolute' }}>
                <Button 
                    onClick={handleClick}
                    variant={buttonStyle}
                    size={buttonSize}
                    startIcon={iconPosition === "start" ? icon : undefined}
                    endIcon={iconPosition === "end" ? icon : undefined}
                >
                    {buttonText}
                </Button>
            </Box>
        </Zoom>
        <Zoom in={isPressed && !isComplete}>
            <Box sx={{ position: 'absolute' }}>
                <TimerComp {...timerProps} />
            </Box>
        </Zoom>
        <Zoom in={isComplete}>
            <Box sx={{ position: 'absolute' }}>
                <CheckCircleIcon sx={{ fontSize: "40px", cursor: 'pointer' }} />
            </Box>
        </Zoom>
    </Box>
    );
  }
  export default LongPressButton