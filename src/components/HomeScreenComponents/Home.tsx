import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from 'react-native';
import { useAppState } from '@src/state/appState';
import { observer } from 'mobx-react-lite';
import { Button } from '@rneui/themed';
import { Onboarding } from '../OnboardingScreenComponents/Onboarding';
import { EventItem } from './EventItem';

export const Home = observer(() => {
    const { routerState, accountState, eventsState } = useAppState();
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
        <View>
            <Text>HomeScreen</Text>
            {eventsState.eventsList.map(event => {
                return <EventItem key={event.id} event={event} />
            })}
            <Button title="Go to Details" onPress={() => routerState.navigateToDetails('1')} />
        </View>
    ) : (
        <Onboarding />
    );
});
