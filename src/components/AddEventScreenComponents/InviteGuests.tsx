import * as React from 'react';
import { Text, View } from 'react-native';
import { useAppState } from '@src/state/appState';
import { observer } from 'mobx-react-lite';
import { Button } from '@rneui/themed';

export const InviteGuests = observer(() => {
    const { routerState } = useAppState();

    return (
        <View>
            <Text style={{ fontSize: 30, marginBottom: 100 }}>InviteGuestsScreen</Text>
            <Text style={{ fontSize: 20, marginBottom: 100 }}>TBD - do we want to invite on this step?</Text>
            <Button
                title="Next"
                style={{ marginTop: 20 }}
                onPress={routerState.navigateToReview}
            />
        </View>
    );
});
