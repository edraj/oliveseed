// create an abstract service for state

import { debug } from '$src/core/rxjs.operators';
import clone from "just-clone";
import { BehaviorSubject, type Observable } from "rxjs";
export interface IStateItem {
  shortname: string;
}

export class ListStateService<T extends IStateItem> {
  protected stateList: BehaviorSubject<T[]> = new BehaviorSubject([]);
  stateList$: Observable<T[]> = this.stateList.asObservable();


  constructor(level?: string) {

    if (level === 'DEBUG') {
      // default dont debug
      this.stateList$ = this.stateList$.pipe(
        debug(this.constructor.name)
      );
    }
  }

  get currentList(): T[] {
    return this.stateList.getValue();
  }

  SetList(list: T[]): Observable<T[]> {
    this.stateList.next(list);
    return this.stateList$;
  }

  append(list: T[]): Observable<T[]> {
    return this.SetList([...this.currentList, ...list]);
  }

  empty() {
    this.stateList.next([]);
  }

  add(item: T): void {
    this.stateList.next([...this.currentList, item]);
  }
  prepend(item: T): void {
    this.stateList.next([item, ...this.currentList]);
  }

  edit(item: T): void {
    const currentList = [...this.currentList];
    const index = currentList.findIndex((n) => n.shortname === item.shortname);
    if (index > -1) {
      currentList[index] = clone(item); // use a proper cloner
      this.stateList.next(currentList);
    }
  }
  remove(item: T): void {
    this.stateList.next(
      this.currentList.filter((n) => n.shortname !== item.shortname)
    );
  }
}
export class StateService<T> {
  protected stateItem: BehaviorSubject<T | null> = new BehaviorSubject(null);
  stateItem$: Observable<T | null> = this.stateItem.asObservable();

  constructor(level?: string) {
    if (level === 'DEBUG') {
      this.stateItem$ = this.stateItem$.pipe(
        debug(this.constructor.name)
      );
    }
  }

  get currentItem(): T | null {
    return this.stateItem.getValue();
  }

  // return ready observable
  SetState(item: T): Observable<T | null> {
    this.stateItem.next(item);
    return this.stateItem$;
  }

  update(item: Partial<T>): Observable<T | null> {
    const newItem = { ...this.currentItem, ...clone(item) };
    this.stateItem.next(newItem);
    return this.stateItem$;
  }

  remove(): void {
    this.stateItem.next(null);
  }
}
