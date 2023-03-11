import * as React from 'react';
import { Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/AntDesign';
import { useAppState } from '@src/state/appState';

export const Filters = observer(() => {
    const { eventsState } = useAppState();
    const { setCategory, setGender, filtersOpened, setFiltersOpened } = eventsState;
    return (
        <View style={styles.filterWrapper}>
            <Pressable style={styles.searchRow} onPress={setFiltersOpened}>
                <Icon name="search1" size={20} color={'#000'} />

                <Icon
                    style={[
                        {
                            transform: [{ rotateY: filtersOpened ? '180deg' : '0deg' }],
                        },
                    ]}
                    name={filtersOpened ? 'downcircleo' : 'upcircleo'}
                    size={20}
                    color={'#000'}
                />
            </Pressable>
            {filtersOpened ? (
                <View>
                    <Text style={{ marginTop: 20 }}>Kategoria wydarzenia</Text>
                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        placeholder={{
                            label: 'Kategoria',
                            value: null,
                        }}
                        onValueChange={(value: string) => setCategory(value)}
                        items={[
                            { label: 'Badminton', value: 'badminton' },
                            { label: 'Tenis', value: 'tenis' },
                            {
                                label: 'Fifa',
                                value: 'fifa',
                            },
                            {
                                label: 'Balet',
                                value: 'balet',
                            },
                            {
                                label: 'Koszykówka',
                                value: 'basketball',
                            },
                        ]}
                        style={{ ...pickerSelectStyles }}
                        //@ts-expect-error
                        Icon={() => <Icon name="down" size={20} color={'#000'} />}
                    />

                    <Text style={{ marginTop: 20 }}>Płeć uczestników</Text>
                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        onValueChange={(value: string) => setGender(value)}
                        placeholder={{
                            label: 'Wybierz płeć',
                            value: null,
                        }}
                        items={[
                            { label: 'Wszyscy', value: 'all' },
                            { label: 'Kobiety', value: 'female' },
                            {
                                label: 'Mężczyzni',
                                value: 'male',
                            },
                        ]}
                        style={{ ...pickerSelectStyles }}
                        //@ts-expect-error
                        Icon={() => <Icon name="down" size={20} color={'#000'} />}
                    />
                </View>
            ) : null}
        </View>
    );
});

const styles = StyleSheet.create({
    filterWrapper: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 20,
    },
    searchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        color: '#91919F',
    },
    inputAndroid: {
        fontSize: 16,
        color: '#91919F',
    },
    placeholder: {
        color: '#91919F',
    },
});
