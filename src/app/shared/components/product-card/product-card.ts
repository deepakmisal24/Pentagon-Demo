import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModel } from '../../../core/services/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  @Input() product!: ProductModel;
}
