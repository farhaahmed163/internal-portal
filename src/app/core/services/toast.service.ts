import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  showSuccess(content: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: content,
    });
  }

  showInfo() {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Message Content',
    });
  }

  showWarn(content: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warn',
      detail: content,
    });
  }

  showError(content: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: content,
    });
  }

  showContrast() {
    this.messageService.add({
      severity: 'contrast',
      summary: 'Error',
      detail: 'Message Content',
    });
  }

  showSecondary() {
    this.messageService.add({
      severity: 'secondary',
      summary: 'Secondary',
      detail: 'Message Content',
    });
  }
}
