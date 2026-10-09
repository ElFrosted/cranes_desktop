import { Component, inject, OnInit, signal } from '@angular/core';
import { Card } from '../../../shared/components/card/card';
import { ServiceSaved } from '../components/service-saved/service-saved';
import { NewServiceService } from '../services/new-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Telefono } from '../../../shared/interfaces/newService.interface';
import { ApiResponse } from '../../../shared/interfaces/api-response.interface';
import { Vehicle } from '../../../shared/interfaces/vehicle.interface';
import { User } from '../../../shared/interfaces/user.interface';
import { ServiceStatus } from '../../../shared/interfaces/service-status.interface';
import { Insurance } from '../../../shared/interfaces/insurance-interface';

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
    estadoServicioLista = signal<ServiceStatus[]>([]);
    aseguradoraLista = signal<Insurance[]>([]);

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
        estadoServicioSel: ['', Validators.required],

        // Ruta
        origen: ['', Validators.required],
        destino: ['', Validators.required],

        // Aseguradora / Operador
        aseguradora: ['', Validators.required],
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

        this.serviceForm.get('aseguradora')?.valueChanges.subscribe((valor: string) => {
            this.handleConditionalValidators(valor);
        });
    }

    private cargarDatosIniciales(): void {
        this.errorMessage.set(null);

        this.newServiceService.getServiceInitData().subscribe({
            next: (res) => {
                const aseguradoras = res.data!.aseguradoras;

                if (aseguradoras && aseguradoras.length > 0) {
                    const primeraAseguradora = aseguradoras[0].nombre;
                    this.serviceForm.patchValue({ aseguradora: primeraAseguradora });
                }

                this.telefonosLista.set(res.data!.telefonos);
                this.tecnicosLista.set(res.data!.usuariosTecnicos);
                this.gruasLista.set(res.data!.gruas);
                this.estadoServicioLista.set(res.data!.estadosServicio);
                this.aseguradoraLista.set(res.data!.aseguradoras);
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

    private handleConditionalValidators(aseguradora: string): void {
        const otroCtrl = this.serviceForm.get('aseguradoraOtro');
        const ikeCtrl = this.serviceForm.get('operadoraIke');

        // Normalizamos el valor a mayúsculas para evitar discrepancias con la API
        const asegUpper = aseguradora ? aseguradora.toUpperCase().trim() : '';

        if (asegUpper === 'OTRO') {
            otroCtrl?.setValidators([Validators.required]);
            ikeCtrl?.clearValidators();
            ikeCtrl?.setValue('');
        } else if (asegUpper === 'IKE') {
            ikeCtrl?.setValidators([Validators.required]);
            otroCtrl?.clearValidators();
            otroCtrl?.setValue('');
        } else {
            otroCtrl?.clearValidators();
            otroCtrl?.setValue('');
            ikeCtrl?.clearValidators();
            ikeCtrl?.setValue('');
        }

        otroCtrl?.updateValueAndValidity();
        ikeCtrl?.updateValueAndValidity();
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
            aseguradora: 'BOLIVAR ',
        });
    }
}
