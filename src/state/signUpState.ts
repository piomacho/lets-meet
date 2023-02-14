import moment from 'moment';
import { makeAutoObservable } from 'mobx';

export class SignUpState {
    date: Date | null = null;
    error: string | null = null;
    successMessage: string | null = null;
    isLoading: boolean = false;

    public firstName: string = '';
    public lastName: string = '';
    public age: string = '';
    public email: string = '';
    public password: string = '';
    public confirmPassword: string = '';
    public gender: string = '';

    public firstNameStatus: boolean | null = null;
    public lastNameStatus: boolean | null = null;
    public genderStatus: boolean | null = null;
    public postCodeStatus: boolean | null = null;
    public emailStatus: boolean | null = null;
    public passwordStatus: boolean | null = null;
    public confirmPasswordStatus: boolean | null = null;

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

    public setFirstName = (name: string) => {
        this.firstName = name;
    };
    public setGender = (name: string) => {
        this.gender = name;
    };

    public setLastName = (lastName: string) => {
        this.lastName = lastName;
    };

    public setAge = (age: string) => {
        this.age = age;
    };

    public setEmail = (email: string) => {
        this.email = email.toLowerCase();
    };
    public setPassword = (password: string) => {
        this.password = password;
    };
    public setConfirmPassword = (password: string) => {
        this.confirmPassword = password;
    };

    validateEmail = (email: string) => {
        return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    };

    validate = (value: string) => {
        if (value === 'name') {
            this.firstNameStatus = this.firstName.length > 0;
        }
        if (value === 'surname') {
            this.lastNameStatus = this.lastName.length > 0;
        }
        if (value === 'email') {
            this.emailStatus = this.validateEmail(this.email);
        }
        if (value === 'postcode') {
            this.postCodeStatus = this.postCode.length > 4 && this.postCode.length < 9;
        }

        if (value === 'password') {
            this.passwordStatus = this.password.length > 7;
        }
        if (value === 'passwordConfirm') {
            this.confirmPasswordStatus = this.confirmPassword.length > 7;
        }
    };

    public onDateChange = (selectedDate: Date | undefined) => {
        const currentDate = selectedDate;
        if (currentDate !== undefined) {
            this.setDate(currentDate);
        }
    };

    public get dateForSignup(): string {
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
            this.firstNameStatus === true &&
            this.lastNameStatus === true &&
            this.emailStatus === true &&
            this.postCodeStatus === true &&
            this.passwordStatus === true &&
            this.confirmPasswordStatus === true &&
            this.isGenderValid === true &&
            this.isDateValid === true
        );
    }

    onEmailRegisterButtonPress = async (email: string, password: string) => {
        try {
            console.log(email, password);
        } catch (error: unknown) {
            //@ts-expect-error
            this.setError(firebaseErrors[error.code]);
        }
    };

    registerUser = async () => {
        try {
            const fields = ['name', 'surname', 'email', 'postcode', 'password', 'password-confirm'];

            fields.forEach(field => {
                this.validate(field);
            });
            if (this.isFormValid === false) {
                return;
            }

            const password = this.password;
            if (password !== this.confirmPassword) {
                this.setError('Passwords do not match');
                return;
            }

            const minAgeDate = moment().subtract(13, 'years');
            const usersDate = moment(this.date);

            if (usersDate.isBefore(minAgeDate) === false) {
                this.setError('You have to be 13+ years old to create a new account');
                return;
            }

            this.setLoading(true);

            await this.onEmailRegisterButtonPress(this.email, this.password);

            this.setLoading(false);
        } catch (err) {
            this.setLoading(false);
        }
    };
}
