import * as React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppState } from '@src/state/appState';
import Icon from 'react-native-vector-icons/AntDesign';

export const BOTTOM_NAV_HEIGHT = 50;

interface PropsTypes {
    icon: JSX.Element;
    isActive: boolean;
    onRedirect: () => void;
}

export const CustomTabBarButton = observer(({ icon, isActive, onRedirect }: PropsTypes) => {
    return (
        <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isActive ? { selected: true } : {}}
            onPress={onRedirect}
            style={styles.customTabBarButtonWrapper}>
            {icon}
        </TouchableOpacity>
    );
});

export const CustomTabBar = observer(() => {
    const insets = useSafeAreaInsets();
    const { routerState } = useAppState();
    const { currentTabName, navigateToHome, navigateToAddEvent, navigateToProfile } = routerState;

    return (
        <View style={[styles.customTabBarMainWrapper, { paddingBottom: insets.bottom }]}>
            <View style={styles.customTabBarWrapper}>
                <CustomTabBarButton
                    icon={
                        <Icon name="appstore-o" size={20} color={currentTabName === 'HomeTab' ? '#bb8800' : '#000'} />
                    }
                    isActive={currentTabName === 'HomeTab'}
                    onRedirect={navigateToHome}
                />
                <CustomTabBarButton
                    icon={
                        <Icon
                            name="pluscircle"
                            size={40}
                            color={currentTabName === 'AddEventTab' ? '#bb8800' : '#000'}
                        />
                    }
                    isActive={currentTabName === 'AddEventTab'}
                    onRedirect={navigateToAddEvent}
                />
                <CustomTabBarButton
                    icon={<Icon name="user" size={20} color={currentTabName === 'ProfileTab' ? '#bb8800' : '#000'} />}
                    isActive={currentTabName === 'ProfileTab'}
                    onRedirect={navigateToProfile}
                />
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    customTabBarMainWrapper: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    customTabBarWrapper: {
        height: BOTTOM_NAV_HEIGHT,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 50,
    },
    customTabBarButtonWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
});
