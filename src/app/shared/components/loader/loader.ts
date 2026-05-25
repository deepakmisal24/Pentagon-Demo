import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  inject,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.html',
  styleUrls: ['./loader.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Loader implements OnDestroy {
  private readonly cdr = inject(ChangeDetectorRef);
  @HostBinding('class.visible') visible = false;

  private readonly onLoading = (e: Event) => {
    const detail = (e as CustomEvent)?.detail as { visible?: boolean } | undefined;
    this.visible = !!detail?.visible;
    this.cdr.markForCheck();
  };

  constructor() {
    window.addEventListener('appLoading', this.onLoading as EventListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('appLoading', this.onLoading as EventListener);
  }
}
