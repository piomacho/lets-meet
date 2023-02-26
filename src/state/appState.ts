import { NavigationContainerRefWithCurrent } from '@react-navigation/native';
import { NavigatorType, RouterState } from '@src/state/routerState';
import { makeAutoObservable } from 'mobx';
import { createContext, useContext } from 'react';
import { AccountState } from './accountState';
import { AddEventState } from './addEventState';
import { MeetsState } from './meetsState';
import { SignUpState } from './signUpState';
import { EventsState } from './eventsState';

export class AppState {
    public readonly routerState: RouterState;
    public readonly meetsState: MeetsState;
    public readonly accountState: AccountState;
    public readonly signUpState: SignUpState;
    public readonly addEventState: AddEventState;
    public readonly eventsState: EventsState;

    constructor(navigationRef: NavigationContainerRefWithCurrent<NavigatorType>) {
        this.routerState = new RouterState(navigationRef);
        this.meetsState = new MeetsState();
        this.accountState = new AccountState();
        this.signUpState = new SignUpState(this.routerState);
        this.eventsState = new EventsState();
        this.addEventState = new AddEventState(this.routerState, this.eventsState);
        makeAutoObservable(this);
    }
}

export const AppStateContext = createContext<AppState | undefined>(undefined);

export function useAppState() {
    const context = useContext(AppStateContext);
    if (context === undefined) {
        throw new Error('useRootStore must be used within RootStoreProvider');
    }
    return context;
}
