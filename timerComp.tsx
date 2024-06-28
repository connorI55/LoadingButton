import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close'; 
import { Theme, Box, useTheme, ThemeProvider  } from '@mui/material';
import * as Utils from '../../MUI Controls/utils'


export interface timerProps {
    active: boolean;
    cancelSeconds: number;
    icon?: React.ReactNode;
    onClick: () => void; 
    onComplete: () => void;
    fontSize?: number;
    containerHeight: number;
    containerWidth: number;
    theme: Theme;
  }

  const TimerComp: React.FC<timerProps> = (props) => {
    const cancelInterval = 100/props.cancelSeconds;
    const [progress, setProgress] = React.useState(cancelInterval);
    const handleClick = () => {
        setProgress(0);
        props.onClick();
    }
    const key = React.useMemo(() => Utils.generateGUID(), []);
  
    React.useEffect(() => {
        let timer: NodeJS.Timeout;

        if (props.active) {
            timer = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                        clearInterval(timer);
                        setProgress(0);
                        return 0;
                    } else {
                        return prevProgress + cancelInterval;
                    }
                });
            }, 1000);
        }

        return () => {
            clearInterval(timer);
            setProgress(cancelInterval);
        };
    }, [props.active]);

    React.useEffect(() => {
        if (progress >= 100) {
            props.onComplete();
        }
    }, [progress, props]);
  

    return (
        <ThemeProvider theme={props.theme}>
        <Box key={key} sx={{ 
            position: 'relative', 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center',
        }}>
            <CircularProgress variant="determinate" value={progress}/>
            <Box sx={{ 
                position: 'absolute',
                 height:"100%", 
                 top: '50%', 
                 left: '50%', 
                 transform: 'translate(-50%, -50%)', 
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: 'center' }}>
                {props.icon || <CloseIcon sx={{ 
                    fontSize: props.fontSize, 
                    cursor: 'pointer' }}  
                    onClick={handleClick}  />} {/* Adjust the fontSize to fit the CircularProgress */}
            </Box>
        </Box>
        </ThemeProvider>
    );
  }

export default TimerComp