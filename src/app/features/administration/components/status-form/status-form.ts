import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SaveServiceStatusDTO, ServiceStatus } from '../../../../shared/interfaces/service-status.interface';

@Component({
    selector: 'app-status-form',
    imports: [ReactiveFormsModule],
    templateUrl: './status-form.html',
    styleUrl: './status-form.scss',
})
export class StatusForm implements OnChanges {
    private fb = inject(FormBuilder);

    @Input() status: ServiceStatus | null = null;

    @Output() onSave = new EventEmitter<SaveServiceStatusDTO>();
    @Output() onCancel = new EventEmitter<void>();

    statusForm: FormGroup = this.fb.group({
        codigo: ['', [Validators.required, Validators.maxLength(20)]],
        descripcion: ['', [Validators.required, Validators.maxLength(100)]],
        activo: [true, [Validators.required]],
    });

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['status']) {
            if (this.status) {
                // Modo Edición: cargar datos del objeto
                this.statusForm.patchValue({
                    codigo: this.status.codigo,
                    descripcion: this.status.descripcion,
                    activo: this.status.activo
                });
            } else {
                // Modo Creación: limpiar formulario
                this.statusForm.reset({
                    codigo: '',
                    descripcion: '',
                    activo: true
                });
            }
        }
    }

    onSubmit(): void {
        if (this.statusForm.invalid) {
            this.statusForm.markAllAsTouched();
            return;
        }

        this.onSave.emit(this.statusForm.value);
    }

    cancel(): void {
        this.onCancel.emit();
    }
}
