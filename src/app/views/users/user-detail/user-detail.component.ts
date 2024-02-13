import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { UsersService } from "src/app/shared/services/user.service";
import { EmployeesService } from "src/app/shared/services/employee.service";
import { UserFormModel } from "../models/user-model";
import { RolesService } from "src/app/shared/services/roles.service";
import { number } from "echarts";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.scss"],
})
export class UserDetailComponent implements OnInit {
  userForm: FormGroup;
  userFormSub: Subscription;
  loading: boolean;
  viewMode: "new" | "edit" | "print" = "new";
  id: string;
  isNew: boolean;
  employeeNotFoundMessage: string = "";
  userData: UserFormModel;
  listRoles: any[];
  roleName: string;
  formBasic: FormGroup;
  invoice: any = {};
  rolesFormArray: FormArray;
  invoiceForm: UntypedFormGroup;
  invoiceFormSub: Subscription;
  employeeName: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private fb: UntypedFormBuilder,
    private toastr: ToastrService,
    private usersService: UsersService,
    private employeeService: EmployeesService,
    private rolesService: RolesService,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this._authService.validateUserPermissions("Usuarios");
    this.id = this.route.snapshot.params["id_user"];
    this.isNew = !this.id;
    this.setViewMode();
    this.inicializateForm(Number(this.id));
    this.loadRoles();
  }

  searchEmployeeByEmail() {
    const idCard = this.userForm.get("id_card_employee").value;

    if (idCard) {
      this.usersService.getEmployeeByEmail(idCard).subscribe(
        (data: any) => {
          this.userForm.patchValue({
            email: data.email, // Actualiza el campo de correo electrónico con el valor obtenido
            id_employee: data.id_employee,
            name_employee: data.name_employee,
          });
          console.log(data.email);
          console.log(data.id_employee);
          console.log(data.name_employee);

          this.employeeNotFoundMessage = ""; // Reinicia el mensaje si se encontró el empleado
        },
        (error: any) => {
          console.error("Error al obtener el correo del empleado:", error);
          this.employeeNotFoundMessage = "Empleado no encontrado"; // Establece el mensaje si no se encuentra el empleado
          // Manejo de errores si es necesario
        }
      );
    }
  }

  private inicializateForm(id: number): void {
    this.userForm = this.formBuilder.group({
      id_user: [],
      id_role: ["", [Validators.required]],
      id_employee: [],
      username: ["", [Validators.required, Validators.maxLength(80)]],
      email: ["", [Validators.email]],
      observation_user: ["", [Validators.maxLength(100)]],
      state_user: [],
      creation_date_user: [],
      password: ["", [Validators.required]],
      name_role: ["", []],
      id_card_employee: [
        "",
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(7),
          Validators.pattern("^[0-9]+$"),
        ],
      ],
      name_employee: [],
    });

    if (this.viewMode == "print" /*|| this.viewMode == 'edit'*/) {
      this.userForm.disable();
    }

    if (this.viewMode != "new") {
      this.getUserByID(id);
      this.email.disable();
      this.id_card_employee.disable();
    }
    //new
    if (this.viewMode != "new" && this.viewMode != "print") {
      this.password.disable();
    }
  }

  //Recibe el rolId y busca el nombre del rol en la lista de roles
  getRoleName(roleId: number) {
    const role = this.listRoles.find((role) => role.id_role === roleId);
    this.roleName = role ? role.name_role : "";
  }

  getCardId(card: string) {}

  //Cargar la lista de roles
  loadRoles() {
    this.usersService.getAllRoles().subscribe(
      (data) => {
        this.listRoles = data;
        const roleIdString = this.route.snapshot.paramMap.get("id_role");
        const roleId = Number(roleIdString);
        this.getRoleName(roleId);
      },
      (error) => {
        console.error("Error al obtener los roles: ", error);
      }
    );
  }

  //ROLES
  getRolesName(employee_id: string): string {
    return this.listRoles.find((x) => x.id_employee == employee_id).name_role;
  }

  private getUserByID(id: number): void {
    this.loading = true;
    this.usersService.getUsersById(id).subscribe({
      next: (response: any) => {
        this.userData = new UserFormModel(response);
        this.setDataUser();
        this.employeeService
          .getEmployeesById(Number(this.userData.id_employee))
          .subscribe({
            next: (data) => {
              this.employeeName = data.employee_name;
            },
            error: (err) => {
              console.log("err", err);
              this.loading = false;
            },
            complete: () => {
              this.loading = false;
            },
          });
      },
      error: (err) => {
        console.log("err", err);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  private setDataUser(): void {
    //  this.loading=true;
    if (this.userData) {
      this.id_role.setValue(this.userData.id_role),
        // this.id_card_employee.setValue(this.userData.id_card_employee),
        this.id_employee.setValue(this.userData.id_employee);

      this.username.setValue(this.userData.username),
        this.email.setValue(this.userData.email),
        this.password.setValue(this.userData.password),
        this.state_user.setValue(this.userData.state_user),
        this.observation_user.setValue(this.userData.observation_user),
        this.userForm.setValue(this.userData);
      this.name_employee.setValue(this.userData.name_employee);
    }
  }

  createUser() {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      this.loading = true;
      this.usersService.createUser(userData).subscribe(
        (response) => {
          this.loading = false;
          console.log("Éxito al crear usuario: ", response);
          this.submit();
        },
        (error) => {
          this.loading = false;
          console.error("Error al crear el usuario: ", this.toastr.error);
          const errorMessage = error.error
            ? error.error
            : "Ocurrió un error al crear el usuario.";
          this.toastr.error(errorMessage, "Error");
        }
      );
    } else {
      this.toastr.error(
        "Por favor, complete todos los campos correctamente.",
        "Error de validación",
        { progressBar: true, timeOut: 3000 }
      );
    }
  }

  checkEmployeeAvailability(): void {
    if (this.id_employee && this.id_employee instanceof AbstractControl) {
      this.validateEmployeeAvailability(this.id_employee).then((result) => {
        if (result) {
          this.id_employee.setErrors(result);
        }
      });
    }
  }

  validateEmployeeAvailability(control: AbstractControl) {
    return new Promise((resolve) => {
      if (!control.value) {
        resolve(null);
      } else {
        this.usersService.checkEmployeeAvailability(control.value).subscribe(
          (isAvailable) => {
            if (isAvailable) {
              resolve(null);
            } else {
              resolve({ employeeTaken: true });
            }
          },
          (error) => {
            resolve({ employeeTaken: true });
          }
        );
      }
    });
  }

  validateNameSimbolAndNumber(control: FormControl) {
    const nameValue = control.value;
    const combinedPattern = /^[\wáéíóúñÑ´\s]+$/;

    return new Promise((resolve) => {
      setTimeout(() => {
        if (combinedPattern.test(nameValue)) {
          const numberCount = (nameValue.match(/\d/g) || []).length;
          if (numberCount <= 1) {
            resolve(null); // Válido
          } else {
            resolve({ invalidName: true }); // No válido
          }
        } else {
          resolve({ invalidName: true }); // No válido
        }
      }, 0);
    });
  }

  public checkEmailAvailability(): void {
    if (this.email && this.email instanceof AbstractControl) {
      this.validateEmail(this.email).then((result) => {
        if (result) {
          this.email.setErrors(result);
        }
      });
    }
  }

  validateEmail(control: AbstractControl) {
    const email = control.value.toLowerCase();
    const validDomains = [
      "gmail.com",
      "hotmail.com",
      "outlook.com",
      "yahoo.com",
    ];
    const domain = email.split("@")[1];

    if (!email) {
      return Promise.resolve(null); // Correo vacío es válido
    }

    if (validDomains.includes(domain)) {
      return new Promise((resolve) => {
        if (!control.value) {
          resolve(null);
        } else {
          this.usersService.checkEmailAvailability(control.value).subscribe(
            (isAvailable) => {
              if (isAvailable) {
                resolve(null); // El correo es válido y está disponible
              } else {
                resolve({ emailTaken: true }); // El correo no está disponible
              }
            },
            (error) => {
              resolve({ emailTaken: true });
            }
          );
        }
      });
    } else {
      return Promise.resolve({ invalidDomain: true }); // No es un correo válido en el dominio permitido
    }
  }

  saveUserChanges(id: number, updatedData: any) {
    this.usersService.updateUser(id, updatedData).subscribe(
      (response) => {
        this.loading = false;
        this.submit();
      },
      (error) => {
        this.loading = false;
        console.error("Error al crear usuario: ", this.toastr.error);
        const errorMessage = error.error
          ? error.error
          : "Ocurrió un error al crear el usuario.";
        this.toastr.error(errorMessage, "Error");
      }
    );
  }

  public submitUser(): void {
    if (this.viewMode == "new") {
      this.createUser();
    } else if (this.viewMode == "edit") {
      this.saveChanges();
    }
  }

  saveChanges() {
    console.log("editar");

    if (this.userForm.valid) {
      const id = Number(this.id); // Convierte el ID a número
      const updatedData = {
        username: this.userForm.get("username").value,
        password: this.userForm.get("password").value,
        email: this.email.value,
        observation_user: this.userForm.get("observation_user").value,
      };
      this.saveUserChanges(id, updatedData);
    } else {
      this.toastr.error(
        "Por favor, complete todos los campos correctamente.",
        "Error de validación",
        { progressBar: true, timeOut: 3000 }
      );
    }
  }

  cancel() {
    this.router.navigateByUrl("/users");
  }

  submit() {
    if (!this.loading) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.toastr.success("Usuario registrado con éxito.", "Éxito", {
          progressBar: true,
          timeOut: 3000,
        });
        setTimeout(() => {
          this.router.navigateByUrl("/users");
        });
      });
    }
  }

  setViewMode() {
    const currentRoute = this.router.url;
    if (currentRoute.includes("/new")) {
      this.viewMode = "new";
    } else if (currentRoute.includes("/edit/")) {
      this.viewMode = "edit";
    } else if (currentRoute.includes("/print/")) {
      this.viewMode = "print";
    }
  }

  print() {
    if (window) {
      window.print();
    }
  }

  get email() {
    return this.userForm.get("email");
  }

  get id_user() {
    return this.userForm.get("id_user");
  }

  get id_role() {
    return this.userForm.get("id_role");
  }

  get id_employee() {
    return this.userForm.get("id_employee");
  }

  get name_role() {
    return this.userForm.get("name_role");
  }
  get id_card_employee() {
    return this.userForm.get("id_card_employee");
  }
  get username() {
    return this.userForm.get("username");
  }
  get state_user() {
    return this.userForm.get("state_user");
  }
  get creation_date_user() {
    return this.userForm.get("creation_date_user");
  }
  get observation_user() {
    return this.userForm.get("observation_user");
  }

  get password() {
    return this.userForm.get("password");
  }
  get name_employee() {
    return this.userForm.get("name_employee");
  }
}
