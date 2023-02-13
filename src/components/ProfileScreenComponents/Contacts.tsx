import * as React from 'react';
import { Text, View } from 'react-native';
import { observer } from 'mobx-react-lite';

export const Contacts = observer(() => {
    return (
        <View>
            <Text style={{ fontSize: 30, marginBottom: 100 }}>ContactsScreen</Text>
        </View>
    );
});
