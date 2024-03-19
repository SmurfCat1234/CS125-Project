
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  public dataImported = new EventEmitter<void>();

  constructor() {}
}
