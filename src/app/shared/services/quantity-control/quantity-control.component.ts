import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'quantity-control',
    styleUrls: ['./quantity-control.component.css'],
    templateUrl: './quantity-control.component.html'
})

export class QuantityControlComponent {
    @Input() quantity: number;
    @Output() onChange = new EventEmitter<number>();

    constructor() { }

    plusOne = () => {
        if (this.quantity < 1000) {
            this.quantity++;
            this.onChange.emit(this.quantity);
        }
    };
    
    minusOne = () => {
        if (this.quantity > 1) {
            this.quantity--;
            this.onChange.emit(this.quantity);
        }
    }
}