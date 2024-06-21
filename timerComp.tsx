import React from 'react';
import './App.css';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close'; 
import { Box } from '@mui/material';


export interface timerProps {
    active: boolean;
    cancelSeconds: number;
    icon?: React.ReactNode;
    onClick: () => void; 
    onComplete: () => void;
  }

  const TimerComp: React.FC<timerProps> = ({ active, cancelSeconds, icon, onClick, onComplete}) => {
    const cancelInterval = 100/cancelSeconds;
    const [progress, setProgress] = React.useState(cancelInterval);
    const handleClick = () => {
        setProgress(0);
        onClick();
    }
  
    React.useEffect(() => {
        let timer: NodeJS.Timeout;

        if (active) {
            timer = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                        onComplete();
                        clearInterval(timer);
                        return 0;
                    } else {
                        return prevProgress + cancelInterval;
                    }
                });
            }, 1000);
        }

        return () => {
            clearInterval(timer);
            setProgress(cancelInterval)
        };
    }, [active, onComplete]);
  
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress variant="determinate" value={progress} />
            <Box sx={{ position: 'absolute', height:"100%", top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {icon || <CloseIcon sx={{ fontSize: 24, cursor: 'pointer' }}  onClick={handleClick}  />} {/* Adjust the fontSize to fit the CircularProgress */}
            </Box>
        </Box>
    );
  }

export default TimerComp