import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackbar:MatSnackBar) { }

  showAlert(msg:string) {
    this.snackbar.open(msg, 'Fermer', {
      horizontalPosition: 'center',
      verticalPosition:'top',
      duration: 10000
    })
  }
}
