import moment from 'moment';
import { makeAutoObservable } from 'mobx';

export class AddEventState {
    date: Date | null = null;
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
    public get isDateValid(): boolean {
        return this.date !== null;
    }

    public get isFormValid(): boolean {
        return (
            this.eventNameStatus === true &&
            this.detailsStatus === true &&
            this.numberOfPeopleStatus === true &&
            this.isGenderValid === true &&
            this.isDateValid === true
        );
    }

    createEvent = async () => {
        try {
            const fields = ['name', 'category', 'details', 'numberOfPeople'];

            fields.forEach(field => {
                this.validate(field);
            });
            if (this.isFormValid === false) {
                return;
            }

            const eventDate = moment(this.date);
            const now = moment(new Date());

            if (now.isBefore(eventDate) === false) {
                this.setError('Niepoprawna data');
                return;
            }

            this.setLoading(true);

            // await Query ...

            this.setLoading(false);
        } catch (err) {
            this.setLoading(false);
        }
    };
}
