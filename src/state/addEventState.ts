import moment from 'moment';
import { makeAutoObservable } from 'mobx';
import { MapPressEvent } from 'react-native-maps';
import { createEvent } from './api/event/createEvent';
import { EventCreateType } from './api/event/eventsTypes';

export class AddEventState {
    date: Date | null = new Date();
    error: string | null = null;
    successMessage: string | null = null;
    isLoading: boolean = false;

    public eventName: string = '';
    public details: string = '';
    public numberOfPeople: number = 2;
    public gender: string = '';
    public category: string = '';

    public eventNameStatus: boolean | null = null;
    public detailsStatus: boolean | null = null;
    public genderStatus: boolean | null = null;
    public numberOfPeopleStatus: boolean | null = null;
    public categoryStatus: boolean | null = null;

    public currentLatitude: number | null = null;
    public currentLongitude: number | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    public setDate = (currentDate: Date | null) => {
        this.date = currentDate;
    };
    public setError = (error: string | null) => {
        this.error = error;
    };

    public setSuccessMessage = (successMessage: string) => {
        this.successMessage = successMessage;
    };

    public setLoading = (status: boolean) => {
        this.isLoading = status;
    };

    public setEventName = (name: string) => {
        this.eventName = name;
    };
    public setGender = (name: string) => {
        this.gender = name;
    };

    public setDetails = (details: string) => {
        this.details = details;
    };

    public setNumberOfPeople = (numberOfPeople: string) => {
        this.numberOfPeople = Number(numberOfPeople);
    };
    public setCategory = (category: string) => {
        this.category = category;
    };

    validate = (value: string) => {
        if (value === 'name') {
            this.eventNameStatus = this.eventName.length > 0;
        }
        if (value === 'category') {
            this.categoryStatus = this.category !== '';
        }
        if (value === 'details') {
            this.detailsStatus = this.details !== '';
        }
        if (value === 'numberOfPeople') {
            this.numberOfPeopleStatus = this.numberOfPeople > 1;
        }
    };

    public onDateChange = (selectedDate: Date | undefined) => {
        const currentDate = selectedDate;
        if (currentDate !== undefined) {
            this.setDate(currentDate);
        }
    };

    public get dateForForm(): string {
        return moment(this.date).format('DD-MM-YYYY');
    }

    public get isGenderValid(): boolean {
        return this.gender !== '';
    }

    public get isEventNameValid(): boolean {
        return this.eventName.length > 0;
    }

    public get isDetailsValid(): boolean {
        return this.details !== '';
    }

    public get isNumberOfPeopleValid(): boolean {
        return this.numberOfPeople > 1;
    }

    public get isDateValid(): boolean {
        const eventDate = moment(this.date);
        const now = moment(new Date());

        if (now.isBefore(eventDate) === false) {
            return false
        }

        return true;
    }

    public get isFormValid(): boolean {
        return (
            this.isEventNameValid &&
            this.isDetailsValid &&
            this.isNumberOfPeopleValid &&
            this.isGenderValid &&
            // this.isDateValid &&
            this.isLocationSet
        );
    }

    public get isLocationSet(): boolean {
        return (
            this.currentLatitude !== null &&
            this.currentLongitude !== null
        );
    }

    private get createEventBody(): EventCreateType | null {
        if (this.isFormValid && this.isLocationSet) {
            return {
                userId: "9315138a-1d9e-11ed-861d-0242ac120002",
                title: this.eventName,
                category: this.category,
                gender: this.gender,
                participants: this.numberOfPeople,
                latitude: this.currentLatitude?.toString() ?? null,
                longitude: this.currentLongitude?.toString() ?? null,
                place: "Floriańska 43, 31-019 Kraków",
                ageFrom: 18,
                ageTo: 99,
                description: this.details,
                date: moment(this.date).toString()
            }
        }
        return null;
    }

    createEvent = async () => {

        console.log('this.createEventBody', this.createEventBody);
        try {
            if (this.createEventBody === null) {
                return;
            }

            this.setLoading(true);

            await createEvent(this.createEventBody)

            this.setLoading(false);
        } catch (err) {
            this.setLoading(false);
        }
    };

    onMapPress = (e: MapPressEvent) => {
        this.currentLatitude = e.nativeEvent.coordinate.latitude;
        this.currentLongitude = e.nativeEvent.coordinate.longitude;
    }
}
