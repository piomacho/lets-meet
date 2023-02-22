import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { useAppState } from '@src/state/appState';
import { observer } from 'mobx-react-lite';
import { Button } from '@rneui/themed';

export const Onboarding = observer(() => {
    const { accountState } = useAppState();

    return (
        <View style={{ alignItems: 'center' }}>
            <Text>Onboarding page</Text>
            <Image
                style={{
                    width: 200,
                    height: 200,
                    margin: 30,
                }}
                source={{
                    uri: 'https://i.pinimg.com/736x/90/f8/15/90f81521cd44b150574ffefaa4ddef78.jpg',
                }}
            />
            <Button title="Close here ! " onPress={() => accountState.closeOnboarding()} />
        </View>
    );
});
