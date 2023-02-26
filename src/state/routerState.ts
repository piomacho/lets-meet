import { makeAutoObservable } from 'mobx';
import { NavigationContainerRefWithCurrent, Route, NavigatorScreenParams } from '@react-navigation/native';
import { ReactiveValue } from '@src/utils/ReactiveValue';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type HomeStackScreenType = {
    Home: undefined;
    Details: { eventId: string };
};

const homeStackRoutes = ['Home', 'Details'];

export type AddEventStackScreenType = {
    AddEvent: undefined;
    InviteGuests: undefined;
    Review: undefined;
    ChooseLocation: undefined;
};

const addEventStackRoutes = ['AddEvent', 'InviteGuests', 'Review'];

export type ProfileStackScreenType = {
    Profile: undefined;
    Contacts: undefined;
    SignUpSecondStep: undefined;
    Login: undefined;
    Settings: undefined;
    Help: undefined;
    About: undefined;
    Details: undefined;
};

const profileStackRoutes = ['Profile', 'Contacts', 'Settings', 'Help', 'About'];

export type NavigatorType = {
    HomeTab: NavigatorScreenParams<HomeStackScreenType>;
    AddEventTab: NavigatorScreenParams<AddEventStackScreenType>;
    ProfileTab: NavigatorScreenParams<ProfileStackScreenType>;
};

// type RouteName = keyof HomeStackScreenType | keyof AddEventStackScreenType | keyof ProfileStackScreenType;

export type DetailsRouteProps = NativeStackScreenProps<HomeStackScreenType, 'Details'>;

export class RouterState {
    private readonly reactiveRouter: ReactiveValue<NavigationContainerRefWithCurrent<NavigatorType>>;

    constructor(navigationRefInner: NavigationContainerRefWithCurrent<NavigatorType>) {
        this.reactiveRouter = new ReactiveValue<NavigationContainerRefWithCurrent<NavigatorType>>(
            navigationRefInner,
            setValue => {
                this.navigationRef.addListener('state', () => {
                    setValue(this.navigationRef);
                });

                return (): void => {
                    if (this.navigationRef !== undefined && this.navigationRef.isReady()) {
                        this.navigationRef.removeListener('state', () => {});
                    }
                };
            },
        );

        makeAutoObservable(this);
    }

    private get navigationRef(): NavigationContainerRefWithCurrent<NavigatorType> {
        return this.reactiveRouter.getValue();
    }

    private get currentRouteRaw(): Route<string, object | undefined> | null {
        return this.reactiveRouter.getValue().getCurrentRoute() ?? null;
    }

    get currentRouteName(): string | null {
        return this.currentRouteRaw?.name ?? null;
    }

    get currentTabName(): 'HomeTab' | 'AddEventTab' | 'ProfileTab' {
        if (this.currentRouteName === null) {
            return 'HomeTab';
        }

        if (homeStackRoutes.includes(this.currentRouteName)) {
            return 'HomeTab';
        }

        if (addEventStackRoutes.includes(this.currentRouteName)) {
            return 'AddEventTab';
        }

        if (profileStackRoutes.includes(this.currentRouteName)) {
            return 'ProfileTab';
        }

        return 'HomeTab';
    }

    goBack = () => {
        const canGoBack = this.navigationRef.canGoBack();
        if (canGoBack) {
            this.navigationRef.goBack();
        }
    };

    navigateToHome = () => {
        this.navigationRef.navigate('HomeTab', {
            screen: 'Home',
        });
    };
    navigateToAddEvent = () => {
        this.navigationRef.navigate('AddEventTab', {
            screen: 'AddEvent',
        });
    };
    navigateToProfile = () => {
        this.navigationRef.navigate('ProfileTab', {
            screen: 'Profile',
        });
    };

    navigateToDetails = (eventId: string) => {
        this.navigationRef.navigate('HomeTab', {
            screen: 'Details',
            params: {
                eventId: eventId,
            },
        });
    };

    navigateToInviteGuests = () => {
        this.navigationRef.navigate('AddEventTab', {
            screen: 'InviteGuests',
        });
    };

    navigateToReview = () => {
        this.navigationRef.navigate('AddEventTab', {
            screen: 'Review',
        });
    };

    navigateToChooseLocation = () => {
        this.navigationRef.navigate('AddEventTab', {
            screen: 'ChooseLocation',
        });
    };

    navigateToContacts = () => {
        this.navigationRef.navigate('ProfileTab', {
            screen: 'Contacts',
        });
    };

    navigateToSignUpSecondStep = () => {
        this.navigationRef.navigate('ProfileTab', {
            screen: 'SignUpSecondStep',
        });
    };

    navigateToLogin = () => {
        this.navigationRef.navigate('ProfileTab', {
            screen: 'Login',
        });
    };

    navigateToUserDetails = () => {
        this.navigationRef.navigate('ProfileTab', {
            screen: 'Details',
        });
    };

    navigateToSettings = () => {
        this.navigationRef.navigate('ProfileTab', {
            screen: 'Settings',
        });
    };

    navigateToHelp = () => {
        this.navigationRef.navigate('ProfileTab', {
            screen: 'Help',
        });
    };

    navigateToAbout = () => {
        this.navigationRef.navigate('ProfileTab', {
            screen: 'About',
        });
    };
}
