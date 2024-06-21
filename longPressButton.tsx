import React from 'react';
import Button from '@mui/material/Button';
import TimerComp from './timerComp';
import { timerProps } from './timerComp';
import Box from '@mui/material/Box';
import Zoom from '@mui/material/Zoom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { createTheme, ThemeProvider} from '@mui/material';
import * as Utils from '../../MUI Controls/utils'



export interface IButtonProps {
    buttonText: string,
    buttonStyle: "text" | "outlined" | "contained",
    buttonSize: "small" | "medium" | "large",
    cancelSeconds: number,
    icon?: React.ReactNode,
    iconPosition: "start" | "end",
    appTheme: ComponentFramework.Theme,
    isEnabled: boolean,
    font?: string,
    fontSize?: number,
    fontColor?: string,
    fontWeight?: "Lighter" | "Normal" | "Semibold" | "Bold",
    primaryColor?: string,
    focus?: boolean,
    containerHeight?: number,
    containerWidth?: number
  }

const LongPressButton: React.FC<IButtonProps> = (props) => {

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
    const key = React.useMemo(() => Utils.generateGUID(), []);

    const theme = createTheme({
        palette: {
          primary: {
            main: Utils.handleDefault(props.primaryColor) || props.appTheme?.colorBrandForeground1 || "#0078d4",
          },
        },
        typography: {
          fontFamily: Utils.handleDefault(props.font) || props.appTheme?.fontFamilyBase || "Segoe UI",
          body1: {
            fontSize: props.fontSize || props.appTheme?.fontSizeBase300 || 14,
            fontWeight: Utils.mapFontWeight(props.fontWeight, props) || props.appTheme?.fontWeightRegular || "Normal",
            color: props.fontColor || "",
          },
        }
      });

    //const for timer props
    const timerProps: timerProps = {
        active: isPressed,
        cancelSeconds: props.cancelSeconds,
        icon: props.icon,
        onClick: handleIconClick,
        onComplete: onComplete
    };

    return (
        <ThemeProvider theme={theme} key={key}>
            <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', width: props.containerWidth+"px", height: props.containerHeight+"px" }}>
                <Zoom in={!isPressed}>
                    <Box key={key + "-Button"} sx={{ position: 'absolute' }}>
                        <Button 
                            onClick={handleClick}
                            variant={props.buttonStyle}
                            size={props.buttonSize}
                            startIcon={props.iconPosition === "start" ? props.icon : undefined}
                            endIcon={props.iconPosition === "end" ? props.icon : undefined}
                        >
                            {props.buttonText}
                        </Button>
                    </Box>
                </Zoom>
                <Zoom in={isPressed && !isComplete}>
                    <Box key={key + "-Timer"} sx={{ position: 'absolute' }}>
                        <TimerComp {...timerProps} />
                    </Box>
                </Zoom>
                <Zoom in={isComplete}>
                    <Box sx={{ position: 'absolute' }}>
                        <CheckCircleIcon key={key + "-Icon"} sx={{ fontSize: "40px", cursor: 'pointer', color: theme.palette.primary.main }} />
                    </Box>
                </Zoom>
            </Box>
        </ThemeProvider>
    );
  }
  export default LongPressButton