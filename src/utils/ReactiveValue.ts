import { createAtom, IAtom } from 'mobx';

type UnsubscrbeType = () => void;
type ConnectType<T> = (setValue: (newValue: T) => void) => UnsubscrbeType;

export class ReactiveValue<T> {
    private value: T;
    private readonly atom: IAtom;
    private unsubscribe: null | UnsubscrbeType;

    public constructor(value: T, onConnect?: ConnectType<T>) {
        this.value = value;
        this.unsubscribe = null;

        if (onConnect === undefined) {
            this.atom = createAtom('value');
        } else {
            this.atom = createAtom(
                'valueConnect',
                () => {
                    if (this.unsubscribe === null) {
                        this.unsubscribe = onConnect(newValue => {
                            this.value = newValue;
                            this.atom.reportChanged();
                        });
                    } else {
                        console.error('Expected null');
                    }
                },
                () => {
                    if (this.unsubscribe === null) {
                        console.error('Expected subscription ');
                    } else {
                        this.unsubscribe();
                        this.unsubscribe = null;
                    }
                },
            );
        }
    }

    public setValue(value: T): void {
        this.value = value;
        this.atom.reportChanged();
    }

    public getValue(): T {
        this.atom.reportObserved();
        return this.value;
    }
}
