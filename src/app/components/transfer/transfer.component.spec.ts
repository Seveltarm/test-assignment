import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

import { TransferComponent } from './transfer.component';

describe('TransferComponent', () => {
  let component: TransferComponent;
  let fixture: ComponentFixture<TransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })
      ],
      declarations: [TransferComponent],
      providers: [
        FormBuilder
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('to account field should be invalid', () => {
    let toAccount = component.transferForm.controls['toAccount'];
    expect(toAccount.valid).toBeFalsy();

    let errors = {};
    toAccount.setValue("");
    errors = toAccount.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('to account field should be valid', () => {
    let toAccount = component.transferForm.controls['toAccount'];
    expect(toAccount.valid).toBeFalsy();

    let errors = {};
    toAccount.setValue("Whole Foods");
    errors = toAccount.errors || {};
    expect(toAccount.valid).toBeTrue();
  });


  it('amount field should be invalid', () => {
    let amount = component.transferForm.controls['amount'];
    expect(amount.valid).toBeFalsy();

    let errors = {};
    amount.setValue("");
    errors = amount.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('amount field should be valid', () => {
    let amount = component.transferForm.controls['amount'];
    expect(amount.valid).toBeFalsy();

    let errors = {};
    amount.setValue("599");
    errors = amount.errors || {};
    expect(amount.valid).toBeTrue();
  });

  it('account balance should be true', () => {
    let amount = component.transferForm.controls['amount'];
    let accountBalance = component.accountBalance;
    let accountBalanceToLow = component.accountBalanceToLow;
    expect(amount.valid).toBeFalsy();

    amount.setValue("6000");
    accountBalance = (accountBalance - amount.value);
    if (accountBalance > -500) {
      accountBalanceToLow = true;
    }
    expect(accountBalanceToLow).toBeTrue();
  });

});
