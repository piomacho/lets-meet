import * as React from 'react';
import { NavigationContainerRefWithCurrent } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    AddEventStackScreenType,
    HomeStackScreenType,
    NavigatorType,
    ProfileStackScreenType,
} from '@src/state/routerState';
import { AppState, AppStateContext } from '@src/state/appState';
import { observer } from 'mobx-react-lite';
import { HomeScreen, DetailsScreen } from '@src/navigation/MainStacks/HomeStackScreen';
import { AddEventScreen, InviteGuestsScreen, ReviewScreen } from '@src/navigation/MainStacks/AddEventStackScreen';
import {
    AboutScreen,
    ContactsScreen,
    HelpScreen,
    ProfileScreen,
    SettingsScreen,
} from '@src/navigation/MainStacks/ProfileStackScreen';

const HomeStack = createNativeStackNavigator<HomeStackScreenType>();

const HomeStackScreen = observer(() => {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name="Home" component={HomeScreen} />
            <HomeStack.Screen name="Details" component={DetailsScreen} />
        </HomeStack.Navigator>
    );
});

const AddEventStack = createNativeStackNavigator<AddEventStackScreenType>();

const AddEventStackScreen = observer(() => {
    return (
        <AddEventStack.Navigator screenOptions={{ headerShown: false }}>
            <AddEventStack.Screen name="AddEvent" component={AddEventScreen} />
            <AddEventStack.Screen name="InviteGuests" component={InviteGuestsScreen} />
            <AddEventStack.Screen name="Review" component={ReviewScreen} />
        </AddEventStack.Navigator>
    );
});

const ProfileStack = createNativeStackNavigator<ProfileStackScreenType>();

const ProfileStackScreen = observer(() => {
    return (
        <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
            <ProfileStack.Screen name="Profile" component={ProfileScreen} />
            <ProfileStack.Screen name="Contacts" component={ContactsScreen} />
            <ProfileStack.Screen name="Settings" component={SettingsScreen} />
            <ProfileStack.Screen name="Help" component={HelpScreen} />
            <ProfileStack.Screen name="About" component={AboutScreen} />
        </ProfileStack.Navigator>
    );
});

const Tab = createBottomTabNavigator<NavigatorType>();

export const MainNavigation = observer(
    ({ navigationRef }: { navigationRef: NavigationContainerRefWithCurrent<NavigatorType> }) => {
        const root = new AppState(navigationRef);

        return (
            <AppStateContext.Provider value={root}>
                <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
                    <Tab.Screen name="HomeTab" component={HomeStackScreen} />
                    <Tab.Screen name="AddEventTab" component={AddEventStackScreen} />
                    <Tab.Screen name="ProfileTab" component={ProfileStackScreen} />
                </Tab.Navigator>
            </AppStateContext.Provider>
        );
    },
);
