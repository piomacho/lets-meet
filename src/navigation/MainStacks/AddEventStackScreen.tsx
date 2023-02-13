import * as React from 'react';
import { observer } from 'mobx-react-lite';
import {
    StackScreenWrapper,
    StackScreenWrapperWithCustomBar,
} from '@src/navigation/NavigationUtils/StackScreenWrapper';
import { AddEvent } from '@src/components/AddEventScreenComponents/AddEvent';
import { InviteGuests } from '@src/components/AddEventScreenComponents/InviteGuests';
import { Review } from '@src/components/AddEventScreenComponents/Review';

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
