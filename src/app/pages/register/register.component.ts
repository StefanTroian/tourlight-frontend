import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/core/services/authService/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  photoURL = '';

  @ViewChild('displayName') displayName!: ElementRef;
  @ViewChild('userEmail') userEmail!: ElementRef;
  @ViewChild('userPassword') userPassword!: ElementRef;
  @ViewChild('userConfirmPassword') userConfirmPassword!: ElementRef;
  
  constructor(
    public authService: AuthService,
    public router: Router,
    public toasterService: ToastrService
  ) { }

  ngOnInit(): void {
  }

  register() {
    if (this.userConfirmPassword.nativeElement.value == this.userPassword.nativeElement.value) {
      this.authService.register(this.userEmail.nativeElement.value, this.userPassword.nativeElement.value, this.photoURL.toString(), this.displayName.nativeElement.value)
    } else {
      this.toasterService.error('Passwords do not match')
    }
  }

  googleAuth() {
    this.authService.googleAuth();
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  onUploadChange(evt: any) {
    const file = evt.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  
  handleReaderLoaded(e) {
    this.photoURL = 'data:image/png;base64,' + btoa(e.target.result);
  }
}
