import { MobxMapAutoNew } from '@src/utils/MobxMapAutoNew';
import { Resource } from '@src/utils/Resource';
import { makeAutoObservable } from 'mobx';
import { EventType } from './api/event/eventsTypes';
import { getEvents } from './api/event/getEvents';
import { EventItemState } from './eventItemState';

export class EventsState {
    private readonly eventsResource: Resource<Array<EventType>>;
    private readonly eventItemStateMap: MobxMapAutoNew<string, EventItemState>;

    public gender: string = '';
    public category: string = '';
    public filtersOpened: boolean = false;

    constructor() {
        this.eventsResource = new Resource(async (): Promise<Array<EventType>> => {
            return await getEvents({
                category: this.category === '' ? null : this.category,
                gender: this.gender === '' ? null : this.gender,
            });
        });
        this.eventItemStateMap = new MobxMapAutoNew((eventId: string) => new EventItemState(eventId));

        makeAutoObservable(this);
    }

    getEventById = (id: string): EventItemState => {
        return this.eventItemStateMap.get(id);
    };

    get eventsList(): Array<EventType> {
        const resource = this.eventsResource.get();
        if (resource.type === 'ready') {
            return resource.value;
        }
        return [];
    }

    refreshList = () => {
        this.eventsResource.refresh();
    };

    public setGender = (name: string) => {
        this.gender = name;
        this.eventsResource.refresh();
    };
    public setFiltersOpened = () => {
        this.filtersOpened = !this.filtersOpened;
    };

    public setCategory = (category: string) => {
        this.category = category;
        this.eventsResource.refresh();
    };
}
