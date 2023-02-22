import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from 'react-native';
import { useAppState } from '@src/state/appState';
import { observer } from 'mobx-react-lite';
import { Button } from '@rneui/themed';
import { Onboarding } from '../OnboardingScreenComponents/Onboarding';

export const Home = observer(() => {
    const { routerState, accountState } = useAppState();
    React.useEffect(() => {
        async function checkStorage() {
            const value = await AsyncStorage.getItem('@first_launch');
            if (value === null || value === 'false') {
                accountState.displayOnboarding(true);
            }
        }
        checkStorage();
    });
    return accountState.showOnboarding === false ? (
        <View style={{ alignItems: 'center' }}>
            <Text>HomeScreen</Text>

            <Button title="Go to Details" onPress={() => routerState.navigateToDetails('1')} />
        </View>
    ) : (
        <Onboarding />
    );
});
