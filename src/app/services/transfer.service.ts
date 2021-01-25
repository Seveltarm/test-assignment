import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  public transfer = new Subject<any>();
  public translation = new Subject<null>();

  constructor() { }

  public newTransfer(transfer: any): void {
    this.transfer.next(transfer);
  }

  public transationEventCalled(): void {
    this.translation.next(null);
  }
}
