import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Card } from '../../../shared/components/card/card';
import { Modal } from '../components/modal/modal';
import { UserService } from '../services/userService/user.service';
import { VehicleService } from '../services/vehicleService/vehicle.service';
import { ServiceStatusService } from '../services/serviceStatus/service-status.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../shared/interfaces/user.interface';
import { Vehicle } from '../../../shared/interfaces/vehicle.interface';
import { ServiceStatus } from '../../../shared/interfaces/service-status.interface';

@Component({
    selector: 'app-administration',
    imports: [Card, Modal, ReactiveFormsModule],
    templateUrl: './administration.html',
    styleUrl: './administration.scss',
})
export class Administration implements OnInit {
    private userService = inject(UserService);
    private vehicleService = inject(VehicleService);
    private statusService = inject(ServiceStatusService);

    // Controles de búsqueda
    userSearchCtrl = new FormControl('');
    vehicleSearchCtrl = new FormControl('');
    statusSearchCtrl = new FormControl('');

    // Estado desplegable de secciones (Acordeones)
    isUsersOpen = signal(false);
    isVehiclesOpen = signal(false);
    isStatusesOpen = signal(false);

    // Listas principales
    users = signal<User[]>([]);
    vehicles = signal<Vehicle[]>([]);
    statuses = signal<ServiceStatus[]>([]);

    // Visibilidad de Modales y Selección para Edición
    isUserModalOpen = signal(false);
    selectedUser = signal<User | null>(null);

    isVehicleModalOpen = signal(false);
    selectedVehicle = signal<Vehicle | null>(null);

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

    loadStatuses(): void {
        this.statusService
            .getServiceStatuses()
            .subscribe((res) => this.statuses.set(res.data || []));
    }

    toggleSection(section: 'users' | 'vehicles' | 'statuses'): void {
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

        if (section === 'statuses') {
            const nextState = !this.isStatusesOpen();
            this.isStatusesOpen.set(nextState);
            if (nextState && this.statuses().length === 0) {
                this.loadStatuses();
            }
        }
    }

    // Métodos para controlar el Modal de Usuarios
    openUserModal(user: User | null = null): void {
        this.selectedUser.set(user);
        this.isUserModalOpen.set(true);
    }

    closeUserModal(): void {
        this.isUserModalOpen.set(false);
        this.selectedUser.set(null);
    }

    // Métodos para controlar el Modal de Vehículos
    openVehicleModal(vehicle: Vehicle | null = null): void {
        this.selectedVehicle.set(vehicle);
        this.isVehicleModalOpen.set(true);
    }

    closeVehicleModal(): void {
        this.isVehicleModalOpen.set(false);
        this.selectedVehicle.set(null);
    }

    openStatusModal(status: ServiceStatus | null = null): void {
        this.selectedStatus.set(status);
        this.isStatusModalOpen.set(true);
    }

    closeStatusModal(): void {
        this.isStatusModalOpen.set(false);
        this.selectedStatus.set(null);
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

    deleteStatus(id: number): void {
        if (confirm('¿Desea eliminar este estado?')) {
            this.statusService.deleteServiceStatus(id).subscribe(() => this.loadStatuses());
        }
    }
}
