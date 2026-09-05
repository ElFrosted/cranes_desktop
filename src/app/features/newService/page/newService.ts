import { Component, inject, OnInit, signal } from '@angular/core';
import { Card } from '../../../shared/components/card/card';
import { ServiceSaved } from '../components/service-saved/service-saved';
import { NewServiceService } from '../services/new-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Telefono } from '../../../shared/interfaces/newService.interface';
import { ApiResponse } from '../../../shared/interfaces/api-response.interface';
import { Vehicle } from '../../../shared/interfaces/vehicle.interface';
import { User } from '../../../shared/interfaces/user.interface';

@Component({
    selector: 'app-dashboard',
    imports: [Card, ServiceSaved, ReactiveFormsModule],
    templateUrl: './newService.html',
    styleUrl: './newService.scss',
})
export class NewService implements OnInit {
    private fb = inject(FormBuilder);
    private newServiceService = inject(NewServiceService);

    telefonosLista = signal<Telefono[]>([]);
    tecnicosLista = signal<User[]>([]);
    gruasLista = signal<Vehicle[]>([]);

    errorMessage = signal<string | null>(null);

    serviceForm: FormGroup = this.fb.group({
        // Tipo de servicio
        tipoServicio: ['GRUA', Validators.required],

        // Información / Asegurado
        registroNum: [{ value: '', disabled: true }],
        nombreAsegurado: ['', Validators.required],
        placaVehiculo: ['', Validators.required],
        telefonoSel: ['', Validators.required],
        telefonoOtro: [''],
        numAutorizacion: ['', Validators.required],
        fechaServicio: ['', Validators.required],
        horaServicio: ['', Validators.required],
        tecnicoSel: ['', Validators.required],
        tecnicoOtro: [''],
        placaGruaSel: ['', Validators.required],
        placaGruaOtro: [''],
        estadoServicio: ['EN PROCESO'],

        // Ruta
        origen: ['', Validators.required],
        destino: ['', Validators.required],

        // Aseguradora / Operador
        aseguradora: ['IKE', Validators.required],
        aseguradoraOtro: [''],
        operadoraIke: [''],

        // Tarifa Base
        ciudadDestino: ['', Validators.required],
        tipoVehiculo: ['liviano'],

        // Kilómetros
        kmNormal: [0],
        kmZonaRoja: [0],

        // Servicios / Recargos Adicionales Manuales
        otroConcepto: [''],
        otroValor: [null],

        // Valor Técnico & Observaciones
        tarifaTecnicoSel: [''],
        tarifaTecnicoOtro: [null],
        observaciones: [''],
        estadoFactura: ['NO FACTURADO'],
        numFactura: [''],
    });

    ngOnInit(): void {
        this.cargarDatosIniciales();
    }

    private cargarDatosIniciales(): void {
        this.errorMessage.set(null);

        this.newServiceService.getServiceInitData().subscribe({
            next: (response) => {
                this.telefonosLista.set(response.data!.telefonos);
                this.tecnicosLista.set(response.data!.usuariosTecnicos);
                this.gruasLista.set(response.data!.gruas);
            },
            error: (err) => {
                console.error('Error al cargar datos del servicio:', err);

                const apiRes: ApiResponse<null> | null = err.error || err;

                if (apiRes?.showsMessage && apiRes?.message) {
                    this.errorMessage.set(apiRes.message);
                } else {
                    this.errorMessage.set(
                        'No se pudieron cargar los parámetros iniciales del servicio.'
                    );
                }
            },
        });
    }

    setTipoServicio(tipo: string): void {
        this.serviceForm.patchValue({ tipoServicio: tipo });
    }

    setAseguradora(aseg: string): void {
        this.serviceForm.patchValue({ aseguradora: aseg });
    }

    guardarServicio(): void {
        if (this.serviceForm.invalid) {
            this.serviceForm.markAllAsTouched();
            return;
        }
        console.log('Datos a enviar:', this.serviceForm.getRawValue());
    }

    limpiarFormulario(): void {
        this.serviceForm.reset({
            tipoServicio: 'GRUA',
            tipoVehiculo: 'liviano',
            kmNormal: 0,
            kmZonaRoja: 0,
            estadoServicio: 'EN PROCESO',
            estadoFactura: 'NO FACTURADO',
            aseguradora: 'IKE',
        });
    }
}
