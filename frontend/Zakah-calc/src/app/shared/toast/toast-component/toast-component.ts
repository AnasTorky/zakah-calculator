import { Component } from '@angular/core';
import {ToastMessage, ToastService} from '../toast-service/toast-service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-toast-component',
  imports: [
    NgClass
  ],
  templateUrl: './toast-component.html',
  styleUrl: './toast-component.css',
})
export class ToastComponent {
  messages: ToastMessage[] = [];

  constructor(private toastService: ToastService) {
    this.toastService.messages$.subscribe(msgs => this.messages = msgs);
  }
}
