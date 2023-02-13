import * as React from 'react';
import { useAppState } from '@src/state/appState';
import { observer } from 'mobx-react-lite';
import Icon from 'react-native-vector-icons/AntDesign';

export const GoBackButton = observer(() => {
    const { routerState } = useAppState();
    return <Icon name="arrowleft" size={20} color="#000" onPress={routerState.goBack} />;
});
