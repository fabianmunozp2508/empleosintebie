import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CvProfileService } from 'src/app/services/cv-profile.service';
import { RolesService } from 'src/app/services/roles.service';
import { CvProfiles } from '../../../../interfaces/cv.interfaces';
import { UserService } from '../../../../services/usuario.service';




@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss']
})
export class BlankComponent implements OnInit {
  users: any[];
cvprofiles: any;

  constructor(private cvProfileService: CvProfileService, private auth: AngularFireAuth, private userService: UserService) { }

  ngOnInit() {
    this.getCvProfiles()
  }

  getCvProfiles() {
    this.cvProfileService.getAllCvProfiles().subscribe(cvprofiles => {
      this.cvprofiles = cvprofiles;
      console.log('Estos son los perfiles de los usuarios', this.cvprofiles);
    });
  }
  async deleteUser(userId: string) {
    try {
      await this.userService.deleteUser(userId);
    } catch (error) {
      console.error(error);
    }
  }

  async blockUser(userId: string) {
    try {
      await this.userService.blockUser(userId);
    } catch (error) {
      console.error(error);
    }
  }
}

