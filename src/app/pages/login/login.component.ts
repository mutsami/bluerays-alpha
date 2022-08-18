import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() formData: EventEmitter<{
    email: string;
    password: string;
  }> = new EventEmitter();

  userData:any;
  user:any;
  form: FormGroup;
  userForm: FormGroup;
  formUser:any;
  
  constructor(public auth:AuthService,private fb: FormBuilder) { 
     console.log('user',this.auth.userData)
   }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      username: ['', Validators.required ],
      phoneNumber: ['', Validators.required],
      addOne: ['', Validators.required],
      addTwo: ['', Validators.required],
      about: ['', Validators.required],
    });
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.userData = localStorage.getItem('user');
    this.user = JSON.parse(this.userData); 

    this.auth.getUser(this.user.uid).subscribe(e=>{
      this.formUser = e; 
      this.userForm.patchValue({ 
        name: this.formUser.displayName,
        username: this.formUser.username,
        email: this.formUser.email,
        phoneNumber: this.formUser.phoneNumber,
        addOne: this.formUser.addOne,
        addTwo: this.formUser.addTwo,
        about: this.formUser.about
      });
    })
  }

  get f(){
    return this.form.controls;
  }

  get t(){
    return this.userForm.controls;
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    this.auth.SignIn(this.form.value.email,this.form.value.password);
  }

  submit(){ 
    this.auth.updateUser(this.user.uid,this.userForm.value)
  }

}
