import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from 'react-native';
import { useAppState } from '@src/state/appState';
import { observer } from 'mobx-react-lite';
import { Button } from '@rneui/themed';
import { Onboarding } from '../OnboardingScreenComponents/Onboarding';
import { EventItem } from './EventItem';
import { Filters } from './Filters';

export const Home = observer(() => {
    const { routerState, accountState, eventsState } = useAppState();
    const user = accountState.firebaseUser;
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
            {user === null ? null : (
                <Text style={{ fontSize: 14, fontWeight: 'bold', margin: 20 }}>Zalogowany jako {user.email}</Text>
            )}
            <Filters />
            {eventsState.eventsList.map(event => {
                return <EventItem key={event.id} event={event} />;
            })}
            <Button
                style={{ marginTop: 20 }}
                title="Go to Details"
                onPress={() => routerState.navigateToDetails('1')}
            />
        </View>
    ) : (
        <Onboarding />
    );
});
