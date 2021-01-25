import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  @Input() showPreview: boolean;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Output() closeModalAndSend: EventEmitter<boolean> = new EventEmitter();

  constructor(
  ) { }

  ngOnInit(): void {
  }

  public cancel(): void {
    this.closeModal.next(false);
  }

  public agree(): void {
    this.closeModalAndSend.next(true);
  }

}
