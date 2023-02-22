import * as React from 'react';
import { Text, View } from 'react-native';
import { useAppState } from '@src/state/appState';
import { observer } from 'mobx-react-lite';
import { Button } from '@rneui/themed';

export const Review = observer(() => {
    const { routerState, addEventState } = useAppState();
    const { createEvent } = addEventState;
    return (
        <View>
            <Text style={{ fontSize: 30, marginBottom: 100 }}>ReviewScreen</Text>
            <Button
                title="Create!"
                style={{ marginTop: 20 }}
                onPress={createEvent}
            />
        </View>
    );
});
