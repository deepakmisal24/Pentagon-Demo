import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty-state.html',
  styleUrls: ['./empty-state.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyState {
  @Input() title = 'Nothing here yet';
  @Input() message = 'Try exploring our menu or create a new order.';
  @Input() icon = '🍽️';
  @Input() ctaLabel?: string;
  @Output() cta = new EventEmitter<void>();

  onCta(): void {
    this.cta.emit();
  }
}
