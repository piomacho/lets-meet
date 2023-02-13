import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { BOTTOM_NAV_HEIGHT, CustomTabBar } from '@src/navigation/CustomTabBar/CustomTabBar';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { GoBackButton } from '@src/navigation/NavigationUtils/GoBackButton';

interface PropsTypes {
    children: React.ReactNode;
}

export const StackScreenWrapperWithCustomBar = observer(({ children }: PropsTypes) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={{ flex: 1, paddingBottom: insets.bottom + BOTTOM_NAV_HEIGHT, paddingTop: insets.top }}>
            <ScrollView>{children}</ScrollView>
            <CustomTabBar />
        </View>
    );
});

export const StackScreenWrapper = observer(({ children }: PropsTypes) => {
    return (
        <SafeAreaView>
            <ScrollView>
                <GoBackButton />
                {children}
            </ScrollView>
        </SafeAreaView>
    );
});
