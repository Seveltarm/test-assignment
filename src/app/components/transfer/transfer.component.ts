import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  public makeTransfer: boolean;
  public accountBalance: number = 5824.76;
  public formInvalid: boolean;
  public accountBalanceToLow: boolean;
  public transferForm = this.formBuilder.group({
    userAccount: new FormControl(null),
    toAccount: new FormControl(null, [Validators.required]),
    amount: new FormControl(null, [Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder,
    private transfer: TransferService
  ) { }

  ngOnInit(): void {
    this.transferForm.controls.userAccount.disable();
  }

  public doNotMakeTransfer(): void {
    this.makeTransfer = false;
    this.formInvalid = false;
    this.transferForm.reset();
  }

  public previewTransfer(): void {
    if (this.transferForm.valid && this.checkBalanceBeforeTransfer()) {
      this.makeTransfer = true;
    } else {
      this.formInvalid = true;
    }
  }

  private checkBalanceBeforeTransfer(): boolean {
    let testAccountAfterOperation: number = this.accountBalance - this.transferForm.value.amount;
    if (testAccountAfterOperation > -500) {
      this.accountBalanceToLow = false;
      return true;
    } else {
      this.accountBalanceToLow = true;
      return false;
    }
  }

  public sendTransfer(): void {
    this.accountBalance = this.accountBalance - this.transferForm.value.amount;
    this.transfer.newTransfer({
      "categoryCode": "#12a580",
      "dates": {
        "valueDate": new Date().getTime()
      },
      "transaction": {
        "amountCurrency": {
          "amount": this.transferForm.value.amount,
          "currencyCode": "EUR"
        },
        "type": "Online Transfer",
        "creditDebitIndicator": "CRDT"
      },
      "merchant": {
        "name": this.transferForm.value.toAccount,
        "accountNumber": "SI64397745065188826"
      }
    });
    this.transferForm.reset();
    this.makeTransfer = false;
    this.formInvalid = false;
    setTimeout(() => {
      this.accountBalance = 5824.76;
    }, 5000)
  }

}
