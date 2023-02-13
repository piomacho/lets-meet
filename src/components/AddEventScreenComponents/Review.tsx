import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { useAppState } from '@src/state/appState';
import { observer } from 'mobx-react-lite';

export const Review = observer(() => {
    const { routerState } = useAppState();

    return (
        <View>
            <Text style={{ fontSize: 30, marginBottom: 100 }}>ReviewScreen</Text>
            <Button title="Next" onPress={() => routerState.navigateToDetails('1')} />
        </View>
    );
});
