import { NavigationContainerRefWithCurrent } from '@react-navigation/native';
import { NavigatorType, RouterState } from '@src/state/routerState';
import { createContext, useContext } from 'react';
import { AccountState } from './accountState';
import { MeetsState } from './meetsState';

export class AppState {
    public readonly routerState: RouterState;
    public readonly meetsState: MeetsState;
    public readonly accountState: AccountState;

    constructor(navigationRef: NavigationContainerRefWithCurrent<NavigatorType>) {
        this.routerState = new RouterState(navigationRef);
        this.meetsState = new MeetsState();
        this.accountState = new AccountState();
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
