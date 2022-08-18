import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core'; 
import { WindowService } from './../../../services/window.service';
import { PhoneNumber } from 'src/app/models/phoneNumber';
import firebase from 'firebase/compat/app';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.component.html',
  styleUrls: ['./phone-login.component.css']
})
export class PhoneLoginComponent implements OnInit {

  
  windowRef: any;

  phoneNumber = new PhoneNumber()

  verificationCode: string;

  user: any;

  constructor(private win: WindowService,private afAuth: AngularFireAuth,public authService:AuthService, private router: Router) { }

  ngOnInit() {
    firebase.initializeApp(environment.firebase)
    this.windowRef = this.win.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')

    this.windowRef.recaptchaVerifier.render()

    $('.digit-group').find('input').each(() => {
      $(this).attr('maxlength', 1);
      $(this).on('keyup', (e: { keyCode: number; }) => {
        var parent = $($(this).parent());
        
        if(e.keyCode === 8 || e.keyCode === 37) {
          var prev = parent.find('input#' + $(this).data('previous'));
          
          if(prev.length) {
            $(prev).select();
          }
        } else if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
          var next = parent.find('input#' + $(this).data('next'));
          
          if(next.length) {
            $(next).select();
          } else {
            if(parent.data('autosubmit')) {
              parent.submit();
            }
          }
        }
      });
    });
  }


  sendLoginCode() {

    const appVerifier = this.windowRef.recaptchaVerifier;

    const num = this.phoneNumber.e164;

    this.afAuth.signInWithPhoneNumber(num, appVerifier)
            .then((result: any) => {

                this.windowRef.confirmationResult = result;

            })
            .catch( (error: any) => console.log(error) );

  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then( (result: { user: any; }) => {

                    this.user = result.user;
                    this.authService.SetUserData(result.user);

                    this.router.navigate(['login']);

    })
    .catch( (error: any) => console.log(error, "Incorrect code entered?"));
  }



}
