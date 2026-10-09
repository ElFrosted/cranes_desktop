import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Insurance, SaveInsuranceDTO } from '../../../../shared/interfaces/insurance-interface';

@Component({
    selector: 'app-insurance-form',
    imports: [ReactiveFormsModule],
    templateUrl: './insurance-form.html',
    styleUrl: './insurance-form.scss',
})
export class InsuranceForm implements OnChanges {
    private fb = inject(FormBuilder);

    @Input() insurance: Insurance | null = null;

    @Output() onSave = new EventEmitter<SaveInsuranceDTO>();
    @Output() onCancel = new EventEmitter<void>();

    insuranceForm: FormGroup = this.fb.group({
        nombre: ['', [Validators.required, Validators.maxLength(100)]],
        codigo: ['', [Validators.required, Validators.maxLength(20)]],
        activo: [true, [Validators.required]],
    });

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['insurance']) {
            if (this.insurance) {
                // Modo Edición: cargar datos del objeto
                this.insuranceForm.patchValue({
                    nombre: this.insurance.nombre,
                    codigo: this.insurance.codigo,
                    activo: this.insurance.activo
                });
            } else {
                // Modo Creación: limpiar formulario
                this.insuranceForm.reset({
                    nombre: '',
                    codigo: '',
                    activo: true
                });
            }
        }
    }

    onSubmit(): void {
        if (this.insuranceForm.invalid) {
            this.insuranceForm.markAllAsTouched();
            return;
        }

        this.onSave.emit(this.insuranceForm.value);
    }

    cancel(): void {
        this.onCancel.emit();
    }
}
