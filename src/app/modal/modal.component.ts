import { Component, Inject, Input, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  s:string
  f:NgForm
  data:string
  constructor(public dialog: MatDialogRef<ModalComponent>,@Inject(MAT_DIALOG_DATA) data )  
     {

      this.s = data.s;
      this.f = data.f;
  }

 
  ngOnInit(): void {
  }

  closemodal()
  {
    this.dialog.close()
    this.f.reset()
  }

}
