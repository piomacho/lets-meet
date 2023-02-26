import * as React from 'react';
import { observer } from 'mobx-react-lite';
import {
    StackScreenWrapper,
    StackScreenWrapperWithCustomBar,
} from '@src/navigation/NavigationUtils/StackScreenWrapper';
import { Profile } from '@src/components/ProfileScreenComponents/Profile';
import { Contacts } from '@src/components/ProfileScreenComponents/Contacts';
import { Settings } from '@src/components/ProfileScreenComponents/Settings';
import { SignUpSecondStep } from '@src/components/SignUpScreenComponents/SignUpSecondStep';
import { Help } from '@src/components/ProfileScreenComponents/Help';
import { About } from '@src/components/ProfileScreenComponents/About';
import { Details } from '@src/components/DetailsScreenComponents/Details';
import { Login } from '@src/components/ProfileScreenComponents/Login';

export const ProfileScreen = observer(() => {
    return (
        <StackScreenWrapperWithCustomBar>
            <Profile />
        </StackScreenWrapperWithCustomBar>
    );
});

export const ContactsScreen = observer(() => {
    return (
        <StackScreenWrapper>
            <Contacts />
        </StackScreenWrapper>
    );
});

export const LoginScreen = observer(() => {
    return (
        <StackScreenWrapper>
            <Login />
        </StackScreenWrapper>
    );
});
export const DetailsScreen = observer(() => {
    return (
        <StackScreenWrapper>
            <Details />
        </StackScreenWrapper>
    );
});
export const SignUpSecondStepScreen = observer(() => {
    return (
        <StackScreenWrapper>
            <SignUpSecondStep />
        </StackScreenWrapper>
    );
});

export const SettingsScreen = observer(() => {
    return (
        <StackScreenWrapper>
            <Settings />
        </StackScreenWrapper>
    );
});

export const HelpScreen = observer(() => {
    return (
        <StackScreenWrapper>
            <Help />
        </StackScreenWrapper>
    );
});

export const AboutScreen = observer(() => {
    return (
        <StackScreenWrapper>
            <About />
        </StackScreenWrapper>
    );
});
