import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import MapView, { Circle, Marker } from 'react-native-maps';
import { CheckBox } from '@rneui/themed';
import { useAppState } from '@src/state/appState';

interface PropsTypes {
    eventId: string;
}

export const Details = observer(({ eventId }: PropsTypes) => {
    const { eventsState } = useAppState();

    const eventItem = eventsState.getEventById(eventId);

    console.log('eventItem', eventItem);

    if (eventItem === null) {
        return (
            <View>
                <Text>Event not found</Text>
            </View>
        )
    }


    const latitude = parseFloat(eventItem.latitude ?? '');
    const longitude = parseFloat(eventItem.longitude ?? '');

    if(isNaN(latitude) || isNaN(longitude)) {
        return (
            <View>
                <Text>Event not found</Text>
            </View>
        )
    }

    return (
        <View>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    region={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}>
                    <Marker
                        coordinate={{
                            latitude: latitude,
                            longitude: longitude,
                        }}
                    />
                </MapView>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
