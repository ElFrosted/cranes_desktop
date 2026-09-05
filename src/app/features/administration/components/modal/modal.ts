import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-modal',
    imports: [],
    templateUrl: './modal.html',
    styleUrl: './modal.scss',
})
export class Modal {
    @Input() isOpen = false;
    @Input() title = '';
    @Output() closed = new EventEmitter<void>();

    close(): void {
        this.closed.emit();
    }
}
