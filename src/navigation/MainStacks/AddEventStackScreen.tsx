import * as React from 'react';
import { observer } from 'mobx-react-lite';
import {
    StackScreenWrapper,
    StackScreenWrapperWithCustomBar,
    StackStaticScreenWrapper,
} from '@src/navigation/NavigationUtils/StackScreenWrapper';
import { AddEvent } from '@src/components/AddEventScreenComponents/AddEvent';
import { InviteGuests } from '@src/components/AddEventScreenComponents/InviteGuests';
import { Review } from '@src/components/AddEventScreenComponents/Review';
import { ChooseLocation } from '@src/components/AddEventScreenComponents/ChooseLocation';

export const AddEventScreen = observer(() => {
    return (
        <StackScreenWrapperWithCustomBar>
            <AddEvent />
        </StackScreenWrapperWithCustomBar>
    );
});

export const InviteGuestsScreen = observer(() => {
    return (
        <StackScreenWrapper>
            <InviteGuests />
        </StackScreenWrapper>
    );
});

export const ReviewScreen = observer(() => {
    return (
        <StackScreenWrapper>
            <Review />
        </StackScreenWrapper>
    );
});

export const ChooseLocationScreen = observer(() => {
    return (
        <StackStaticScreenWrapper>
            <ChooseLocation />
        </StackStaticScreenWrapper>
    );
});
