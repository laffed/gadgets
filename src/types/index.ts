export type ImmutablePrimitive = undefined | null | boolean | string | number | Function;

export type Immutable<T> =
    T extends ImmutablePrimitive ? T :
    T extends Array<infer U> ? ImmutableArray<U> :
    T extends Map<infer K, infer V> ? ImmutableMap<K, V> :
    T extends Set<infer M> ? ImmutableSet<M> : ImmutableObject<T>;

export type ImmutableArray<T> = ReadonlyArray<Immutable<T>>;
export type ImmutableMap<K, V> = ReadonlyMap<Immutable<K>, Immutable<V>>;
export type ImmutableSet<T> = ReadonlySet<Immutable<T>>;
export type ImmutableObject<T> = { readonly [K in keyof T]: Immutable<T[K]> };

export type OrNull<T> = T | null;

export type Flavoring<Flavor> = {
  _type?: Flavor;
}
export type Flavor<T, Flavor> = T & Flavoring<Flavor>;

export type TupleEntry<T extends readonly unknown[], I extends unknown[] = [], R = never> =
  T extends readonly [infer Head, ...infer Tail] ?
    TupleEntry<Tail, [...I, unknown], R | [`${I['length']}`, Head]> :
    R;

export type ObjectEntry<T> =
T extends object ?
  { [K in keyof T]: [K, Required<T>[K]] }[keyof T] extends infer E ?
    E extends [infer K, infer V] ?
      K extends string | number ?
        [`${K}`, V] :
        never :
      never :
    never :
  never;

export type Entry<T extends object> =
  T extends readonly [unknown, ...unknown[]] ?
    TupleEntry<T> :
    T extends ReadonlyArray<infer U> ?
      [`${number}`, U] :
      ObjectEntry<T>;

