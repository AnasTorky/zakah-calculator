import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  text: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _messages = new BehaviorSubject<ToastMessage[]>([]);
  messages$ = this._messages.asObservable();

  show(message: ToastMessage) {
    const current = this._messages.getValue();
    this._messages.next([...current, message]);

    // إزالة الرسالة بعد المدة المحددة
    setTimeout(() => {
      const updated = this._messages.getValue().filter(m => m !== message);
      this._messages.next(updated);
    }, message.duration || 4000);
  }

  success(text: string, duration?: number) {
    this.show({ text, type: 'success', duration });
  }

  error(text: string, duration?: number) {
    this.show({ text, type: 'error', duration });
  }

  info(text: string, duration?: number) {
    this.show({ text, type: 'info', duration });
  }
}
