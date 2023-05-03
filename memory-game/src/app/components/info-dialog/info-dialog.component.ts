import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent implements OnInit {

  title:string = '';
  message:string = '';

  constructor(@Inject(MAT_DIALOG_DATA) data: any, public dialogRef: MatDialogRef<InfoDialogComponent>) {
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
}
