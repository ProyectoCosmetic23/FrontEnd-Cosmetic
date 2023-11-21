import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  teamMembers = [
    'Mariana Granados Sierra',
    'Julián Andres Carreño Tejada',
    'Marcela Morales Moreno',
    'Juan Sebastian Tamayo Toro',
    'Alejandro Cañas Arango',
  ];

  constructor(private modalService: NgbModal) {}

  showTeamModal(content: any) {
    this.modalService.open(content, { centered: true, animation: true });
  }
}
