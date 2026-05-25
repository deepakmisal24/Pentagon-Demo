import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrls: ['./toast.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toast {
  private readonly cdr = inject(ChangeDetectorRef);

  @Input() messages: ToastMessage[] = [];
  @Input() position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' = 'top-right';
  @Input() duration = 5000;
  @Output() dismiss = new EventEmitter<string>();

  onDismiss(id: string): void {
    this.dismiss.emit(id);
    this.cdr.markForCheck();
  }
}
