import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { useAppState } from '@src/state/appState';
import { observer } from 'mobx-react-lite';
import { SignUpFirstStep } from '../SignUpScreenComponents/SignUpFirstStep';

export const Profile = observer(() => {
    const { routerState } = useAppState();

    return (
        <View>
            <SignUpFirstStep />
            <View style={{ alignItems: 'center' }}>
                <Button title="Go to Contacts" onPress={routerState.navigateToContacts} />
                <Button title="Go to Login" onPress={routerState.navigateToLogin} />
                <Button title="Go to Settings" onPress={routerState.navigateToSettings} />
                <Button title="Go to Help" onPress={routerState.navigateToHelp} />
                <Button title="Go to About" onPress={routerState.navigateToAbout} />
            </View>
        </View>
    );
});
