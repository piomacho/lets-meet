import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { useAppState } from '@src/state/appState';
import { observer } from 'mobx-react-lite';

export const AddEvent = observer(() => {
    const { routerState } = useAppState();

    return (
        <View style={{ alignItems: 'center' }}>
            <Text>AddEventScreen</Text>
            <Button title="Next" onPress={routerState.navigateToInviteGuests} />
        </View>
    );
});
