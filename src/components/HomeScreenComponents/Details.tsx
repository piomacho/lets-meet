import * as React from 'react';
import { Text, View } from 'react-native';
import { observer } from 'mobx-react-lite';

interface PropsTypes {
    eventId: string;
}

export const Details = observer(({ eventId }: PropsTypes) => {
    return (
        <View>
            <Text style={{ fontSize: 30, marginBottom: 100 }}>DetailsScreen {eventId}</Text>
        </View>
    );
});
