import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { useAppState } from '@src/state/appState';
import { observer } from 'mobx-react-lite';

export const Home = observer(() => {
    const { routerState } = useAppState();

    return (
        <View style={{ alignItems: 'center' }}>
            <Text>HomeScreen</Text>
            <Button title="Go to Details" onPress={() => routerState.navigateToDetails('1')} />
        </View>
    );
});
