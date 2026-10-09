import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Rol, SaveUserDTO, TipoDocumento, User } from '../../../../shared/interfaces/user.interface';

@Component({
    selector: 'app-user-form',
    imports: [ReactiveFormsModule],
    templateUrl: './user-form.html',
    styleUrl: './user-form.scss',
})
export class UserFormComponent implements OnChanges {
    private fb = inject(FormBuilder);

    @Input() user: User | null = null;
    @Input() tiposDocumento: TipoDocumento[] = [];
    @Input() roles: Rol[] = [];

    @Output() onSave = new EventEmitter<SaveUserDTO>();
    @Output() onCancel = new EventEmitter<void>();

    userForm: FormGroup = this.fb.group({
        tipoDocumentoId: ['', Validators.required],
        documento: ['', Validators.required],
        rolId: ['', Validators.required],
        primerNombre: ['', Validators.required],
        segundoNombre: [''],
        primerApellido: ['', Validators.required],
        segundoApellido: [''],
        clave: ['']
    });

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['user']) {
            if (this.user) {
                // Modo Edición: Cargar valores existentes
                this.userForm.patchValue({
                    tipoDocumentoId: this.user.tipoDocumentoId,
                    documento: this.user.documento,
                    rolId: this.user.rolId,
                    primerNombre: this.user.primerNombre,
                    segundoNombre: this.user.segundoNombre || '',
                    primerApellido: this.user.primerApellido,
                    segundoApellido: this.user.segundoApellido || '',
                    clave: '' // La contraseña no se muestra por seguridad
                });
                this.userForm.get('clave')?.clearValidators();
            } else {
                // Modo Creación: Resetear formulario y requerir clave
                this.userForm.reset({ tipoDocumentoId: '', rolId: '' });
                this.userForm.get('clave')?.setValidators([Validators.required]);
            }
            this.userForm.get('clave')?.updateValueAndValidity();
        }
    }

    onSubmit(): void {
        if (this.userForm.valid) {
            this.onSave.emit(this.userForm.value);
        }
    }
}
