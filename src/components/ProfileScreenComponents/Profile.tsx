import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { useAppState } from '@src/state/appState';
import { observer } from 'mobx-react-lite';

export const Profile = observer(() => {
    const { routerState } = useAppState();

    return (
        <View style={{ alignItems: 'center' }}>
            <Text>ProfileScreen</Text>
            <Button title="Go to Contacts" onPress={routerState.navigateToContacts} />
            <Button title="Go to Settings" onPress={routerState.navigateToSettings} />
            <Button title="Go to Help" onPress={routerState.navigateToHelp} />
            <Button title="Go to About" onPress={routerState.navigateToAbout} />
        </View>
    );
});
