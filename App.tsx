import * as React from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { NavigatorType } from '@src/state/routerState';
import { MainNavigation } from '@src/navigation/MainNavigation';
import { ThemeProvider, createTheme } from '@rneui/themed';

const theme = createTheme({
    lightColors: {
        primary: '#bc6d4f',
        secondary: '#9d331f',
    },
    darkColors: {
        primary: '#bc6d4f',
        secondary: '#9d331f',
    },
    mode: 'light',
});

export default function App() {
    const navigationRef = useNavigationContainerRef<NavigatorType>();
    const [isReady, setIsReady] = React.useState(false);

    return (
        <ThemeProvider theme={theme}>
            <NavigationContainer onReady={() => setIsReady(true)} ref={navigationRef}>
                {isReady ? <MainNavigation navigationRef={navigationRef} /> : null}
            </NavigationContainer>
        </ThemeProvider>
    );
}
