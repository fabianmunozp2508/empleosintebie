import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/services/roles.service';



@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss']
})
export class BlankComponent implements OnInit {
  users: any[];

  constructor(private rolesServicee: RolesService) { }

  ngOnInit() {
    this.rolesServicee.getUsersByRole('Aspirante').then(users => {
      this.users = users;
      console.log("usuarios Aspitante ",this.users);
    });


  }

}
