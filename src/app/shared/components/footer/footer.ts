import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  @Input() brand = 'FoodApp';
  @Input() small = false;

  get year(): number {
    return new Date().getFullYear();
  }
}
