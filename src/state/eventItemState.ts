import { Resource } from "@src/utils/Resource";
import { makeAutoObservable } from "mobx";
import { EventType } from "./api/event/eventsTypes";
import { getEventItem } from "./api/event/getEventItem";

export class EventItemState {

    private readonly eventItemResource: Resource<EventType | null>;

    constructor(
        private readonly eventId: string
    ) {

        this.eventItemResource = new Resource(async (): Promise<EventType | null> => {
            return await getEventItem(eventId);
        });

        makeAutoObservable(this)    
    }

    get eventItem(): EventType | null {
        const resource = this.eventItemResource.get();

        if (resource.type === 'ready') {
            return resource.value;
        }
        return null;
    }

    get isLoading(): boolean {
        const resource = this.eventItemResource.get();

        return resource.type === 'loading';
    }
}