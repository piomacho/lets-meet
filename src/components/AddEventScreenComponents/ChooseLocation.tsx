import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import MapView, { Marker } from 'react-native-maps';
import { useAppState } from '@src/state/appState';
import { Button } from '@rneui/themed';

export const ChooseLocation = observer(() => {
    const { routerState, addEventState } = useAppState();
    const {
        onMapPress,
        currentLatitude,
        currentLongitude
    } = addEventState;

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    onPress={onMapPress}
                    region={{
                        latitude: 50.0647,
                        longitude: 19.945,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}>
                    {currentLatitude === null || currentLongitude === null ? null : (
                        <Marker
                            coordinate={{
                                latitude: currentLatitude,
                                longitude: currentLongitude,
                            }}
                        />
                    )}
                </MapView>
            </View>
            <Button title="Potwierdz" onPress={routerState.goBack} />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        height: '100%',
        ...StyleSheet.absoluteFillObject,
    },
});