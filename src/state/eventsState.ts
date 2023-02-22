import { Resource } from "@src/utils/Resource";
import { makeAutoObservable } from "mobx";
import { EventType } from "./api/event/eventsTypes";
import { getEvents } from "./api/event/getEvents";

export class EventsState {

    private readonly eventsResource: Resource<Array<EventType>>;

    constructor() {

        this.eventsResource = new Resource(async (): Promise<Array<EventType>> => {
            return await getEvents();
        });

        makeAutoObservable(this);
    }

    // will fail with deep link to this page
    getEventById = (id: string): EventType | null => {
        return this.eventsList.find(elem => elem.id === id) ?? null
    }

    get eventsList(): Array<EventType> {
        const resource = this.eventsResource.get();
        if (resource.type === 'ready') {
            return resource.value;
        }
        return [];
    }
}