import * as React from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { NavigatorType } from '@src/state/routerState';
import { MainNavigation } from '@src/navigation/MainNavigation';

export default function App() {
    const navigationRef = useNavigationContainerRef<NavigatorType>();
    const [isReady, setIsReady] = React.useState(false);

    return (
        <NavigationContainer onReady={() => setIsReady(true)} ref={navigationRef}>
            {isReady ? <MainNavigation navigationRef={navigationRef} /> : null}
        </NavigationContainer>
    );
}
