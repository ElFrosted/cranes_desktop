import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Card } from '../../../shared/components/card/card';
import { Modal } from '../components/modal/modal';
import { UserService } from '../services/userService/user.service';
import { VehicleService } from '../services/vehicleService/vehicle.service';
import { ServiceStatusService } from '../services/serviceStatus/service-status.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
    CreateUserDTO,
    SaveUserDTO,
    UserInitDataParams,
    User,
} from '../../../shared/interfaces/user.interface';
import {
    SaveVehicleDTO,
    Vehicle,
    VehicleInitDataParams,
} from '../../../shared/interfaces/vehicle.interface';
import {
    SaveServiceStatusDTO,
    ServiceStatus,
} from '../../../shared/interfaces/service-status.interface';
import { UserFormComponent } from '../components/user-form/user-form';
import { VehicleFormComponent } from '../components/vehicle-form/vehicle-form';
import { StatusForm } from '../components/status-form/status-form';
import { InsuranceService } from '../services/insuranceService/insurance-service';
import { Insurance, SaveInsuranceDTO } from '../../../shared/interfaces/insurance-interface';
import { InsuranceForm } from '../components/insurance-form/insurance-form';

@Component({
    selector: 'app-administration',
    imports: [
    Card,
    Modal,
    ReactiveFormsModule,
    UserFormComponent,
    VehicleFormComponent,
    StatusForm,
    InsuranceForm
],
    templateUrl: './administration.html',
    styleUrl: './administration.scss',
})
export class Administration implements OnInit {
    private userService = inject(UserService);
    private vehicleService = inject(VehicleService);
    private insuranceService = inject(InsuranceService);
    private statusService = inject(ServiceStatusService);

    // Controles de búsqueda
    userSearchCtrl = new FormControl('');
    vehicleSearchCtrl = new FormControl('');
    insuranceSearchCtrl = new FormControl('');
    statusSearchCtrl = new FormControl('');

    // Estado desplegable de secciones (Acordeones)
    isUsersOpen = signal(false);
    isVehiclesOpen = signal(false);
    isInsurancesOpen = signal(false);
    isStatusesOpen = signal(false);
    isModalLoading = signal(false);

    // Listas principales
    users = signal<User[]>([]);
    vehicles = signal<Vehicle[]>([]);
    insurances = signal<Insurance[]>([]);
    statuses = signal<ServiceStatus[]>([]);

    // Parametros de creacon
    userParams = signal<UserInitDataParams>({
        tiposDocumento: [],
        roles: [],
    });

    vehicleParams = signal<VehicleInitDataParams>({
        tiposVehiculo: [],
    });

    // Visibilidad de Modales y Selección para Edición
    isUserModalOpen = signal(false);
    selectedUser = signal<User | null>(null);

    isVehicleModalOpen = signal(false);
    selectedVehicle = signal<Vehicle | null>(null);

    isInsuranceModalOpen = signal(false);
    selectedInsurance = signal<Insurance | null>(null);

    isStatusModalOpen = signal(false);
    selectedStatus = signal<ServiceStatus | null>(null);

    // Filtros calculados mediante Signals Computed
    filteredUsers = computed(() => {
        const query = this.userSearchCtrl.value?.toLowerCase() || '';
        return this.users().filter(
            (u) => u.primerNombre.toLowerCase().includes(query) || u.documento.includes(query)
        );
    });

    filteredVehicles = computed(() => {
        const query = this.vehicleSearchCtrl.value?.toLowerCase() || '';
        return this.vehicles().filter(
            (v) => v.placa.toLowerCase().includes(query) || v.codigo.includes(query)
        );
    });

    filteredInsurances = computed(() => {
        const query = this.insuranceSearchCtrl.value?.toLowerCase() || '';
        return this.insurances().filter(
            (i) => i.nombre.toLowerCase().includes(query) || i.codigo.includes(query)
        );
    });

    filteredStatuses = computed(() => {
        const query = this.statusSearchCtrl.value?.toLowerCase() || '';
        return this.statuses().filter(
            (s) => s.descripcion.toLowerCase().includes(query) || s.codigo.includes(query)
        );
    });

    ngOnInit(): void {
        this.toggleSection('users');
    }

    // Métodos individuales de carga
    loadUsers(): void {
        this.userService.getUsers().subscribe((res) => this.users.set(res.data || []));
    }

    loadVehicles(): void {
        this.vehicleService.getVehicles().subscribe((res) => this.vehicles.set(res.data || []));
    }

    loadInsurances(): void {
        this.insuranceService
            .getInsurances()
            .subscribe((res) => this.insurances.set(res.data || []));
    }

    loadStatuses(): void {
        this.statusService
            .getServiceStatuses()
            .subscribe((res) => this.statuses.set(res.data || []));
    }

    // Metodos para abrir y cerrar las secciones
    toggleSection(section: 'users' | 'vehicles' | 'insurances' | 'statuses'): void {
        if (section === 'users') {
            const nextState = !this.isUsersOpen();
            this.isUsersOpen.set(nextState);
            if (nextState && this.users().length === 0) {
                this.loadUsers();
            }
        }

        if (section === 'vehicles') {
            const nextState = !this.isVehiclesOpen();
            this.isVehiclesOpen.set(nextState);
            if (nextState && this.vehicles().length === 0) {
                this.loadVehicles();
            }
        }

        if (section === 'insurances') {
            const nextState = !this.isInsurancesOpen();
            this.isInsurancesOpen.set(nextState);
            if (nextState && this.insurances().length === 0) {
                this.loadInsurances();
            }
        }

        if (section === 'statuses') {
            const nextState = !this.isStatusesOpen();
            this.isStatusesOpen.set(nextState);
            if (nextState && this.statuses().length === 0) {
                this.loadStatuses();
            }
        }
    }

    // Metodo para consultar los parametros de usuario
    loadUserParams(): void {
        this.userService.getInitData().subscribe((res) => {
            if (res.success && res.data) {
                this.userParams.set(res.data);
            }
        });
    }

    // Metodo para consultar los parametros de vehiculo
    loadVehicleParams(): void {
        this.vehicleService.getInitData().subscribe((res) => {
            if (res.success && res.data) {
                this.vehicleParams.set(res.data);
            }
        });
    }

    // Métodos para controlar el Modal de Usuarios
    openUserModal(userId?: number): void {
        // Peticion para tener los tipo de documentos y roles
        if (this.userParams().tiposDocumento.length === 0) {
            this.loadUserParams();
        }

        // Abrir Modal
        this.isUserModalOpen.set(true);

        if (userId) {
            // Modo edicion, para la peticion de datos
            this.isModalLoading.set(true);
            this.userService.getUserById(userId).subscribe({
                next: (res) => {
                    this.selectedUser.set(res.data);
                    this.isModalLoading.set(false);
                },
                error: () => {
                    this.isModalLoading.set(false);
                    this.closeUserModal();
                },
            });
        } else {
            // Modo creacion
            this.selectedUser.set(null);
            this.isModalLoading.set(false);
        }
    }

    closeUserModal(): void {
        this.isUserModalOpen.set(false);
        this.selectedUser.set(null);
    }

    // Métodos para controlar el Modal de Vehículos
    openVehicleModal(vehicleId?: number): void {
        // Peticion para tener los tipo de vehiculos
        if (this.vehicleParams().tiposVehiculo.length === 0) {
            this.loadVehicleParams();
        }

        // Abrir el Modal
        this.isVehicleModalOpen.set(true);

        if (vehicleId) {
            // Modo edicion, para la peticion de datos
            this.isModalLoading.set(true);
            this.vehicleService.getVehicleById(vehicleId).subscribe({
                next: (res) => {
                    this.selectedVehicle.set(res.data);
                    this.isModalLoading.set(false);
                },
                error: () => {
                    this.isModalLoading.set(false);
                    this.closeVehicleModal();
                },
            });
        } else {
            // Modo creacion
            this.selectedVehicle.set(null);
            this.isModalLoading.set(false);
        }
    }

    closeVehicleModal(): void {
        this.isVehicleModalOpen.set(false);
        this.selectedVehicle.set(null);
    }

    openInsuranceModal(insuranceId?: number): void {
        // Abrir el Modal
        this.isInsuranceModalOpen.set(true)

        if (insuranceId) {
            // Modo edicion, para la peticion de datos
            this.isModalLoading.set(true);
            this.insuranceService.getInsuranceById(insuranceId).subscribe({
                next: (res) => {
                    this.selectedInsurance.set(res.data);
                    this.isModalLoading.set(false);
                },
                error: () => {
                    this.isModalLoading.set(false);
                    this.closeInsuranceModal();
                },
            });
        } else {
            // Modo creacion
            this.selectedStatus.set(null);
            this.isModalLoading.set(false);
        }
    }

    closeInsuranceModal(): void {
        this.isInsuranceModalOpen.set(false);
        this.selectedInsurance.set(null);
    }

    openStatusModal(statusId?: number): void {
        // Abrir el Modal
        this.isStatusModalOpen.set(true);

        if (statusId) {
            // Modo edicion, para la peticion de datos
            this.isModalLoading.set(true);
            this.statusService.getServiceStatusById(statusId).subscribe({
                next: (res) => {
                    this.selectedStatus.set(res.data);
                    this.isModalLoading.set(false);
                },
                error: () => {
                    this.isModalLoading.set(false);
                    this.closeStatusModal();
                },
            });
        } else {
            // Modo creacion
            this.selectedStatus.set(null);
            this.isModalLoading.set(false);
        }
    }

    closeStatusModal(): void {
        this.isStatusModalOpen.set(false);
        this.selectedStatus.set(null);
    }

    // Metodo para procesar el submit de usuario
    saveUser(dto: SaveUserDTO): void {
        const currentUser = this.selectedUser();

        if (currentUser) {
            // Si hay un usuario es actualizacion
            this.userService.updateUser(currentUser.id, dto).subscribe(() => {
                this.loadUsers(); // Refrescamos la lista general
                this.closeUserModal();
            });
        } else {
            // Si no hay usuario es creacion
            this.userService.createUser(dto as CreateUserDTO).subscribe(() => {
                this.loadUsers();
                this.closeUserModal();
            });
        }
    }

    // Metodo para procesar el submit de vehiculo
    saveVehicle(dto: SaveVehicleDTO): void {
        const currentVehicle = this.selectedVehicle();

        if (currentVehicle) {
            // Si hay vehiculo es actualizacion
            this.vehicleService.updateVehicle(currentVehicle.id, dto).subscribe(() => {
                this.loadVehicles();
                this.closeVehicleModal();
            });
        } else {
            // Si no hay vehiculo es creacion
            this.vehicleService.createVehicle(dto).subscribe(() => {
                this.loadVehicles();
                this.closeVehicleModal();
            });
        }
    }

    // Metodo para procesar el submit de aseguradora
    saveInsurance(dto: SaveInsuranceDTO): void {
        const currentInsurance = this.selectedInsurance();

        if (currentInsurance) {
            // Si hay vehiculo es actualizacion
            this.insuranceService.updateInsurance(currentInsurance.id, dto).subscribe(() => {
                this.loadInsurances();
                this.closeInsuranceModal();
            });
        } else {
            // Si no hay vehiculo es creacion
            this.insuranceService.createInsurance(dto).subscribe(() => {
                this.loadInsurances();
                this.closeInsuranceModal();
            });
        }
    }

    // Metodo para procesar el submit del estado de servicio
    saveStatus(dto: SaveServiceStatusDTO): void {
        const currentStatus = this.selectedStatus();

        if (currentStatus) {
            // Si hay un estado de servicio es actualizacion
            this.statusService.updateServiceStatus(currentStatus.id, dto).subscribe(() => {
                this.loadStatuses();
                this.closeStatusModal();
            });
        } else {
            // Si no hay estado es creacion
            this.statusService.createServiceStatus(dto).subscribe(() => {
                this.loadStatuses();
                this.closeStatusModal();
            });
        }
    }

    // Eliminar registro
    deleteUser(id: number): void {
        if (confirm('¿Desea eliminar este usuario?')) {
            this.userService.deleteUser(id).subscribe(() => this.loadUsers());
        }
    }

    deleteVehicle(id: number): void {
        if (confirm('¿Desea eliminar este vehículo?')) {
            this.vehicleService.deleteVehicle(id).subscribe(() => this.loadVehicles());
        }
    }

    deleteInsurance(id: number): void {
        if (confirm('¿Desea eliminar esta aseguradora?')) {
            this.insuranceService.deleteInsurance(id).subscribe(() => this.loadInsurances());
        }
    }

    deleteStatus(id: number): void {
        if (confirm('¿Desea eliminar este estado?')) {
            this.statusService.deleteServiceStatus(id).subscribe(() => this.loadStatuses());
        }
    }
}
