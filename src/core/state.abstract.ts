// create an abstract service for state

import clone from 'just-clone';
import { get, readonly, writable, type Readable, type Writable } from 'svelte/store';

export interface IStateItem {
  shortname: string;
}

export class ListStateService<T extends IStateItem> {

  protected stateList: Writable<T[]> = writable([] as T[]);
  stateList$: Readable<T[]> = readonly(this.stateList);


  constructor(level?: string) {

    if (level === 'DEBUG') {
      // default dont debug, don't over use, this is leakage
      this.stateList.subscribe((list) => _debug(list, this.constructor.name));
    }
  }

  get currentList(): T[] {
    return get(this.stateList);
  }

  SetList(list: T[]): Readable<T[]> {
    this.stateList.set(list);
    return this.stateList$;
  }

  Refresh(): Readable<T[]> {
    this.stateList.set(this.currentList);
    return this.stateList$;
  }
  append(list: T[]): Readable<T[]> {
    return this.SetList([...this.currentList, ...list]);
  }

  empty() {
    this.stateList.set([]);
  }

  add(item: T): void {
    this.stateList.update((list) => [...list, item]);
  }
  prepend(item: T): void {
    this.stateList.update((list) => [item, ...list]);
  }

  edit(item: T): void {

    this.stateList.update((list) => {
      const index = list.findIndex((n) => n.shortname === item.shortname);
      if (index > -1) {
        const newList = [...list];
        newList[index] = clone(item); // use a proper cloner
        return newList;
      }
      return list;
    });

  }
  remove(item: T): void {
    this.stateList.update((list) => list.filter((n) => n.shortname !== item.shortname));
  }

  removeMany(items: T[]): void {
    this.stateList.update((list) => list.filter((n) => !items.map(i => i.shortname).includes(n.shortname)));
  }
}
export class StateService<T> {
  protected stateItem = writable(null as T | null);
  stateItem$ = readonly(this.stateItem);


  constructor(level?: string) {
    if (level === 'DEBUG') {
      this.stateItem.subscribe((list) => _debug(list, this.constructor.name));
    }
  }

  get currentItem(): T | null {
    return get(this.stateItem);
  }

  SetState(item: T): Readable<T | null> {
    this.stateItem.set(item);
    return this.stateItem$;
  }

  update(item: Partial<T>): Readable<T | null> {
    this.stateItem.update((n) => ({ ...n, ...clone(item) }));
    return this.stateItem$;
  }

  remove(): void {
    this.stateItem.set(null);
  }
}
