import { Component, OnInit } from '@angular/core';
import { InitialConfigurationComponent } from '../initial-configuration/initial-configuration.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    // let dialogRef = this.dialog.open(InitialConfigurationComponent, {
    //   height: '400px',
    //   width: '600px',
    // });
  }

}
