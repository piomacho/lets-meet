import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { DetailsRouteProps } from '@src/state/routerState';
import {
    StackScreenWrapper,
    StackScreenWrapperWithCustomBar,
} from '@src/navigation/NavigationUtils/StackScreenWrapper';
import { Home } from '@src/components/HomeScreenComponents/Home';
import { Details } from '@src/components/HomeScreenComponents/Details';

export const HomeScreen = observer(() => {
    return (
        <StackScreenWrapperWithCustomBar>
            <Home />
        </StackScreenWrapperWithCustomBar>
    );
});

export const DetailsScreen = observer(({ route }: DetailsRouteProps) => {
    return (
        <StackScreenWrapper>
            <Details eventId={route.params.eventId} />
        </StackScreenWrapper>
    );
});
