import { makeAutoObservable } from 'mobx';

interface MeetItemType {
    id: string;
    type: string;
    latitude: number;
    longitude: number;
}

const TEMP_MEETS_LIST: Array<MeetItemType> = [
    {
        id: 'fdsfsdfsdfsfgerqrv',
        type: 'football',
        latitude: 50.077551,
        longitude: 19.889222,
    },
    {
        id: 'fdsfsdfsfqgerqrv',
        type: 'football',
        latitude: 50.0439,
        longitude: 19.953759,
    },
    {
        id: 'fdsfsdfsfgterqrv',
        type: 'badminton',
        latitude: 50.033483,
        longitude: 20.008934,
    },
    {
        id: 'fdsfsdfsfgberqrv',
        type: 'tennis',
        latitude: 50.053421,
        longitude: 19.972377,
    },
    {
        id: 'fdsfsdfsfccgerqrv',
        type: 'coffe',
        latitude: 50.075809,
        longitude: 19.969011,
    },
];

export class MeetsState {
    filters: Array<string> = [];
    constructor() {
        makeAutoObservable(this);
    }

    get meetsList(): Array<MeetItemType> {
        return TEMP_MEETS_LIST.filter(elem => this.filters.includes(elem.type));
    }

    onChangeFilter = (type: string) => {
        if (this.filters.includes(type)) {
            this.filters = this.filters.filter(elem => elem !== type);
        } else {
            this.filters.push(type);
        }
    };
}
