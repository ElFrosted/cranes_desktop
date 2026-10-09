import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SaveVehicleDTO, TipoVehiculo, Vehicle } from '../../../../shared/interfaces/vehicle.interface';

@Component({
    selector: 'app-vehicle-form',
    imports: [ReactiveFormsModule],
    templateUrl: './vehicle-form.html',
    styleUrl: './vehicle-form.scss',
})
export class VehicleFormComponent implements OnChanges {
    private fb = inject(FormBuilder);

    @Input() vehicle: Vehicle | null = null;
    @Input() tiposVehiculo: TipoVehiculo[] = [];

    @Output() onSave = new EventEmitter<SaveVehicleDTO>();
    @Output() onCancel = new EventEmitter<void>();

    vehicleForm: FormGroup = this.fb.group({
        tipoVehiculoId: ['', Validators.required],
        placa: ['', Validators.required],
        codigo: ['', Validators.required]
    });

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['vehicle']) {
            if (this.vehicle) {
                this.vehicleForm.patchValue({
                    tipoVehiculoId: this.vehicle.tipoVehiculo.id,
                    placa: this.vehicle.placa,
                    codigo: this.vehicle.codigo
                });
            } else {
                this.vehicleForm.reset({ tipoVehiculoId: '' });
            }
        }
    }

    onSubmit(): void {
        if (this.vehicleForm.valid) {
            this.onSave.emit(this.vehicleForm.value);
        }
    }
}
