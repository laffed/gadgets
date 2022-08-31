import { Entry } from '../types';

type Entries = <T extends object>(object: T) => ReadonlyArray<Entry<T>>;
export const entries: Entries = <T extends object>(obj: T) => Object.entries(obj) as unknown as ReadonlyArray<Entry<T>>;

