import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { RestService } from 'src/app/services/rest.service';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsComponent implements OnInit {
  public transfers$: Observable<any>;
  public originalArray = [];
  public sortFirst: string = 'dates';
  public sortSecond: string = 'valueDate'
  public sortThird: string;
  public sortOrder: string = 'desc';
  
  private newTransfer: Subscription;

  constructor(
    private rest: RestService,
    private transfer: TransferService,
    private changeDetector : ChangeDetectorRef,
    private translate: TranslateService
  ) { 
    this.changeDetector.detach();
  }

  ngOnInit(): void {
    this.transfers$ = this.rest.getTransfers().pipe(shareReplay());
    this.transfers$.forEach(() => {
      this.changeDetector.detectChanges();
    });
    this.addNewTransfers();
    this.translationEvent();
  }

  ngOnDestroy(): void {
    this.newTransfer.unsubscribe();
  }

  private addNewTransfers(): void {
    this.newTransfer = this.transfer.transfer.subscribe(newItem =>
      this.transfers$.forEach(transferList => {
        transferList.data.unshift(newItem);
        this.originalArray = transferList;
        this.changeDetector.detectChanges();
        setTimeout(() => {
          this.transfers$ = this.rest.getTransfers().pipe(shareReplay());
          this.transfers$.forEach(() => {
            this.changeDetector.detectChanges();
          });
        }, 5000)
      })
    );
  }

  private translationEvent(): void {
    this.translate.onLangChange.subscribe(() => {
      this.changeDetector.reattach();
    });
    this.changeDetector.detach();
  }

  public search($event): void {
    const inputValue = $event.target.value;
    let modifiedArray = [];
    if (!this.originalArray.length) {
      this.makeOriginalArray();
    }
    this.transfers$.forEach(transfers => {
      modifiedArray = this.originalArray.filter(transfer => {
        if (transfer.merchant.name.toLowerCase().includes(inputValue) ||
          transfer.transaction.type.toLowerCase().includes(inputValue)) {
          return transfer
        }
      })
      transfers.data = modifiedArray;
      this.changeDetector.detectChanges();
    });
  }

  public sort(string: string, stringIndent: string, stringMoreIndent?: string): void {
    let changeDirection: boolean;
    if (!this.originalArray.length) {
      this.makeOriginalArray();
    }
    if (this.sortFirst !== string) {
      this.sortFirst = string;
      this.sortSecond = stringIndent;
      this.sortThird = stringMoreIndent;
      changeDirection = false;
    } else {
      changeDirection = true;
    }

    if (this.sortOrder === 'asc' && changeDirection) {
      this.sortOrder = 'desc';
    } else if (changeDirection) {
      this.sortOrder = 'asc';
    }
    this.changeDetector.detectChanges();
  }

  private makeOriginalArray(): void {
    this.transfers$.forEach(transfers => {
      this.originalArray = transfers.data;
    });
  }

}
