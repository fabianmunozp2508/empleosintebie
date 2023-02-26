import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CvProfiles } from 'src/app/interfaces/cv.interfaces';
import { CvProfileService } from 'src/app/services/cv-profile.service';
import { UserService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
})
export class CvComponent implements OnInit {
  cvprofiles: CvProfiles[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private cvProfileService: CvProfileService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.optener();
  }

  optener() {
    this.cvProfileService
      .getcvprofile()
      .subscribe((cvprofiles: CvProfiles[]) => {
        console.log('cvprofiles', cvprofiles);
        this.cvprofiles = cvprofiles;
      });
  }
}
