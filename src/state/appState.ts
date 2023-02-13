import { NavigationContainerRefWithCurrent } from '@react-navigation/native';
import { NavigatorType, RouterState } from '@src/state/routerState';
import { createContext, useContext } from 'react';

export class AppState {
    public readonly routerState: RouterState;

    constructor(navigationRef: NavigationContainerRefWithCurrent<NavigatorType>) {
        this.routerState = new RouterState(navigationRef);
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
