import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { User } from '../userInterface/user';
import { UserService } from '../userService/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public toaster: ToastrService,
    public userService: UserService
  ) { 
    // Saving user data in localstorage and remove on logged out
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user','null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }


  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.ngZone.run(() => {
          this.router.navigate(['feed']);
        });
        this.setUserData(res.user);
      })
      .catch((err) => {
        this.toaster.error(err.message)
      })
  }

  register(email: string, password: string, photoURL?: string, displayName?: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        // this.sendVerificationMail();
        let u = JSON.parse(JSON.stringify(res.user));
        u.photoURL = photoURL;

        if (displayName) {
          u.displayName = displayName;
        }

        this.setUserData(u);
        
        this.userService.createUser(u).subscribe({
          next: (response: any) => {
            if (response) {
              this.router.navigate(['feed']);
              this.toaster.success(response.message);
            }
          },
          error: (err) => {
            this.toaster.error(err.message);
          }
        });
      })
      .catch((err) => {
        this.toaster.error(err.message)
      })
  }

  sendVerificationMail() {
    return this.afAuth.currentUser
      .then((user: any) => user.sendEmailVerification())
      .then(() => this.router.navigate(['verify-email'])); 
  }

  forgotPassword(passwordResetEmail: string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.toaster.info('Password reset email sent');
      })
      .catch((err) => {
        this.toaster.error(err.message)
      })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user != null;
    // && user.emailVerified !== false ? true : false
  }

  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider())
      .then((res: any) => {
        if (res) {
          this.router.navigate(['feed'])
        }
      })
      .catch((err) => {
        this.toaster.error(err.message)
      })
  }

  authLogin(provider: any) {
    return this.afAuth.signInWithPopup(provider)
      .then((res) => {
        this.ngZone.run(() => {
          setTimeout(() => {
            this.router.navigate(['feed']);
          })
        });
        this.setUserData(res.user);
        this.userService.createUser(res.user).subscribe({
          next: (response: any) => {
          },
          error: (err) => {
            this.toaster.error(err.message)
          }
        });
      })
      .catch((err) => {
        this.toaster.error(err.message)
      })
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    return userRef.set(userData, {
      merge: true,
    });
  }

  logout() {
    return this.afAuth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['login']); 
      })
  }

}
