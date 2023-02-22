import { MobxMapAutoNew } from "@src/utils/MobxMapAutoNew";
import { Resource } from "@src/utils/Resource";
import { makeAutoObservable } from "mobx";
import { EventType } from "./api/event/eventsTypes";
import { getEvents } from "./api/event/getEvents";
import { EventItemState } from "./eventItemState";

export class EventsState {

    private readonly eventsResource: Resource<Array<EventType>>;
    private readonly eventItemStateMap: MobxMapAutoNew<string, EventItemState>;

    constructor() {

        this.eventsResource = new Resource(async (): Promise<Array<EventType>> => {
            return await getEvents();
        });
        this.eventItemStateMap = new MobxMapAutoNew((eventId: string) => new EventItemState(eventId));

        makeAutoObservable(this);
    }

    getEventById = (id: string): EventItemState => {
        return this.eventItemStateMap.get(id);
    }

    get eventsList(): Array<EventType> {
        const resource = this.eventsResource.get();
        if (resource.type === 'ready') {
            return resource.value;
        }
        return [];
    }

    refreshList = () => {
        this.eventsResource.refresh();
    }
}