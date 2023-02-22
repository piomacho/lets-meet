import { makeAutoObservable, runInAction } from 'mobx';

type ResultLoading = {
    readonly type: 'loading';
};

type ResultReady<T> = {
    readonly type: 'ready';
    readonly value: T;
};

interface ResultError {
    type: 'error';
}

type ResultLoadingInner = {
    readonly type: 'loading';
    readonly promise: Promise<void>;
};

type ResultInner<T> = ResultLoadingInner | ResultReady<T> | ResultError;

export type Result<T> = ResultLoading | ResultReady<T> | ResultError;

export class Resource<T> {
    readonly getValue: () => Promise<T>;
    value: null | ResultInner<T>;

    constructor(getValue: () => Promise<T>) {
        this.getValue = getValue;
        this.value = null;
        makeAutoObservable(this);
    }

    private async startLoad(): Promise<void> {
        try {
            const value = await this.getValue();

            runInAction(() => {
                this.value = {
                    type: 'ready',
                    value,
                };
            });
        } catch (error) {
            console.error('Resource startLoad:', error);

            if (this.value?.type === 'loading') {
                runInAction(() => {
                    this.value = {
                        type: 'error',
                    };
                });
            }
        }
    }

    private init(): void {
        if (this.value === null) {
            this.value = {
                type: 'loading',
                promise: this.startLoad(),
            };
        }
    }

    get(): Result<T> {
        const value = this.value;

        if (value === null) {
            setTimeout(() => {
                this.init();
            }, 0);

            return {
                type: 'loading',
            };
        }

        return value;
    }

    clear(): void {
        this.value = null;
    }

    async refreshAndWait(): Promise<void> {
        const value = this.value;
        if (value !== null && value.type === 'loading') {
            return value.promise;
        }

        await this.startLoad();
    }

    refresh(): void {
        this.refreshAndWait().catch(error => {
            console.error('Resource refresh:', error);
        });
    }
}
