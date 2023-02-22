import * as React from 'react';
import { Avatar, ListItem } from '@rneui/themed';


import { Text, TouchableOpacity, View } from 'react-native';
import { useAppState } from '@src/state/appState';
import { observer } from 'mobx-react-lite';
import { Button } from '@rneui/themed';
import { EventType } from '@src/state/api/event/eventsTypes';
import Icon from 'react-native-vector-icons/AntDesign';

interface PropsTypes {
    event: EventType
}

export const EventItem = observer(({ event }: PropsTypes) => {
    const { routerState, eventsState } = useAppState();

    const randomId = Math.floor(Math.random() * 100);

    return (
        <TouchableOpacity onPress={() => routerState.navigateToDetails(event.id)}>
            <ListItem bottomDivider>
                <Avatar
                    rounded
                    source={{ uri: `https://randomuser.me/api/portraits/women/${randomId}.jpg` }}
                />
                <ListItem.Content>
                    <ListItem.Title>{event.title}</ListItem.Title>
                    <ListItem.Subtitle>{event.date}</ListItem.Subtitle>
                </ListItem.Content>
                <Icon name="rocket1" size={20} color="#000" />
            </ListItem>
        </TouchableOpacity>
    );
});
