import { Component, OnInit } from "@angular/core";
import { UntypedFormGroup, UntypedFormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RolesService } from "src/app/shared/services/roles.service";
import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormGroup, Validator } from "@angular/forms";
import { viewport } from "@popperjs/core";

interface Role {
  name_role: string;
  state_role: string;
  modules_role: string[];
}
@Component({
  selector: "app-roles-detail",
  templateUrl: "./roles-detail.component.html",
  styleUrls: ["./roles-detail.component.scss"],
})
export class RolesDetailComponent implements OnInit {
  loading: boolean;
  showLoadingScreen: boolean = false;
  formBasic: FormGroup;
  viewMode: "new" | "edit" | "print" = "new";
  id: string;
  nameErrorMessage: string = "";
  isNew: boolean;
  roles: any = {};
  rolesForm: UntypedFormGroup;
  rolesFormSub: Subscription;
  subTotal: number;
  saving: boolean;
  showErrorMessageModules: boolean = false;
  showErrorMessageName: boolean = false;
  role: Role = {
    name_role: "",
    state_role: "Activo",
    modules_role: [],
  };
  selected_modules = [];
  new_role = {
    name_role: "",
    state_role: "Activo",
    modules_role: [],
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _rolesService: RolesService,
    private toastr: ToastrService
  ) {
    this.formBasic = this.formBuilder.group({});
  }

  ngOnInit() {
    this.id = this.route.snapshot.params["id_role"];
    this.isNew = !this.id;
    this.buildRolesForm(this.roles);
    this.setViewMode();
    this.getRole();
  }

  buildRolesForm(i: any = {}) {
    this.rolesForm = this.fb.group({
      id: [i.id],
      nombreRol: [i.nombre_rol],
      modulosRol: [i.nombre_rol],
    });
  }

  setViewMode() {
    const currentRoute = this.router.url;
    if (currentRoute.includes("/new")) {
      this.viewMode = "new";
    } else if (currentRoute.includes("/edit/")) {
      this.viewMode = "edit";
    } else if (currentRoute.includes("/detail/")) {
      this.viewMode = "print";
    }
  }

  getRole() {
    this.showLoadingScreen = true;
    const currentRoute = this.router.url;
    if (currentRoute.includes("/edit/") || currentRoute.includes("/detail/")) {
      this.id = this.route.snapshot.params["id_role"];
      console.log(this.id);
      this._rolesService.getRoleById(this.id).subscribe(
        (data) => {
          this.role = data;
          this.selected_modules = this.role.modules_role;
          this.new_role.name_role = this.role.name_role;
          console.log(this.selected_modules);
          console.log(this.role);
          this.showLoadingScreen = false;
        },
        (error) => {
          console.error("Error al obtener rol:", error);
          this.showLoadingScreen = false;
        }
      );
    }
  }

  handleModuleSelection(module: string) {
    if (this.selected_modules.includes(module)) {
      this.selected_modules = this.selected_modules.filter(
        (item) => item !== module
      );
      this.new_role.modules_role = this.selected_modules;
    } else {
      this.selected_modules.push(module);
    }
    const moduleCount = this.selected_modules.length;
    console.log(moduleCount);
    this.showErrorMessageModules = moduleCount < 1;
    if (moduleCount < 1) {
      console.log(this.showErrorMessageModules);
    }
  }

  handleNameSelection(event: any) {
    this.showErrorMessageName = false; // Reiniciar el estado de error

    const inputValue = event.target.value;

    // Validar la cantidad de caracteres
    if (inputValue.length < 5) {
      this.showErrorMessageName = true;
      this.nameErrorMessage = "El nombre del rol debe tener al menos 5 caracteres.";
      return;
    }

    // Validar que no haya espacios
    if (/\s/.test(inputValue)) {
      this.showErrorMessageName = true;
      this.nameErrorMessage = "El nombre del rol no puede contener espacios.";
      return;
    }

    // Validar que no haya números
    if (/\d/.test(inputValue)) {
      this.showErrorMessageName = true;
      this.nameErrorMessage = "El nombre del rol no puede contener números.";
      return;
    }

    // Validar que no haya símbolos
    if (/[^a-zA-Z]/.test(inputValue)) {
      this.showErrorMessageName = true;
      this.nameErrorMessage = "El nombre del rol no puede contener símbolos.";
      return;
    }

    // Si todas las validaciones pasan, actualizar el valor en tu objeto
    this.new_role.name_role = inputValue;
    console.log(this.new_role.name_role);
  }

  saveData() {
    if (
      this.selected_modules.length == 0 ||
      this.showErrorMessageModules == true ||
      this.showErrorMessageName == true
    ) {
      if (this.showErrorMessageName == true) {
        this.toastr.error("Nombre de rol incorrecto.", "Error", {
          progressBar: true,
        });
      } else if (
        this.selected_modules.length == 0 ||
        this.showErrorMessageModules == true
      ) {
        this.toastr.error("Seleccione como mínimo un permiso.", "Error", {
          progressBar: true,
        });
      }
    } else {
      if (this.viewMode == "new") {
        this.createRole();
      } else if (this.viewMode == "edit") {
        this.editRole();
      }
    }
  }

  createRole() {
    const currentRoute = this.router.url;
    this.new_role.modules_role = this.selected_modules;
    console.log(currentRoute);
    if (currentRoute.includes("/new")) {
      console.log(this.new_role);
      this._rolesService.createRole(this.new_role).subscribe(
        (data) => {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.toastr.success("Rol creado con éxito.", "Proceso Completado", {
              progressBar: true,
              timeOut: 3000,
            });
            setTimeout(() => {
              this.router.navigate(["/roles"]);
            }, 3000);
          }, 3000);
        },
        (error) => {
          this.loading = false;
          this.toastr.error("Fallo al crear el rol.", "Error", {
            progressBar: true,
          });
          console.error("Error al crear el rol:", error);
        }
      );
    }
    this.loading = true;
  }

  editRole() {
    const currentRoute = this.router.url;
    console.log(currentRoute);
    if (currentRoute.includes("/edit")) {
      if (this.id && this.new_role) {
        this.new_role.modules_role = this.selected_modules;
        console.log(this.selected_modules);
        console.log(this.new_role);
        this._rolesService.editRole(this.id, this.new_role).subscribe(
          (data) => {
            this.loading = false;

            // Asegúrate de que la respuesta del servicio contiene los datos esperados
            console.log("Respuesta del servicio editRole:", data);

            this.toastr.success(
              "Rol actualizado con éxito.",
              "Proceso Completado",
              {
                progressBar: true,
                timeOut: 3000,
              }
            );

            setTimeout(() => {
              this.router.navigate(["/roles"]);
            }, 3000);
          },
          (error) => {
            this.loading = false;
            this.toastr.error("Fallo al actualizar el rol.", "Error", {
              progressBar: true,
            });
            console.error("Error al actualizar el rol:", error);
          }
        );
      } else {
        console.error("ID o new_role no definidos correctamente.");
      }
    }

    this.loading = true;
  }
}
