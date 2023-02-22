import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import MapView, { Circle } from 'react-native-maps';
import { CheckBox } from '@rneui/themed';
import { useAppState } from '@src/state/appState';

interface PropsTypes {
    eventId: string;
}

const getColor = (type: string): { fill: string; stroke: string } => {
    if (type === 'football') {
        return {
            fill: 'rgba(230,238,255,0.5)',
            stroke: '#1a66ff',
        };
    }
    if (type === 'badminton') {
        return {
            fill: 'rgba(230,238,255,0.5)',
            stroke: '#1aff25',
        };
    }
    if (type === 'tennis') {
        return {
            fill: 'rgba(230,238,255,0.5)',
            stroke: '#ecff1a',
        };
    }

    return {
        fill: 'rgba(230,238,255,0.5)',
        stroke: '#ff1a1a',
    };
};

export const Details = observer(({ eventId }: PropsTypes) => {
    const { meetsState } = useAppState();
    const { meetsList, filters, onChangeFilter } = meetsState;

    return (
        <View>
            <CheckBox
                center
                title="Football"
                checked={filters.includes('football')}
                onPress={() => onChangeFilter('football')}
            />
            <CheckBox
                center
                title="Badminton"
                checked={filters.includes('badminton')}
                onPress={() => onChangeFilter('badminton')}
            />
            <CheckBox
                center
                title="Tennis"
                checked={filters.includes('tennis')}
                onPress={() => onChangeFilter('tennis')}
            />
            <CheckBox
                center
                title="Coffe"
                checked={filters.includes('coffe')}
                onPress={() => onChangeFilter('coffe')}
            />

            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    region={{
                        latitude: 50.0647,
                        longitude: 19.945,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}>
                    {meetsList.map(meet => {
                        const { fill, stroke } = getColor(meet.type);
                        return (
                            <Circle
                                center={{ latitude: meet.latitude, longitude: meet.longitude }}
                                radius={500}
                                fillColor={fill}
                                strokeColor={stroke}
                            />
                        );
                    })}
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
