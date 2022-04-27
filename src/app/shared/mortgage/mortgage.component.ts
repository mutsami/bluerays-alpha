import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mortgage',
  templateUrl: './mortgage.component.html',
  styleUrls: ['./mortgage.component.css']
})
export class MortgageComponent implements OnInit {
  mortgate:any;
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.form = new FormGroup({
      amount: new FormControl('', Validators.required),
      deposit: new FormControl('', Validators.required),
      interest: new FormControl('', Validators.required),
      term: new FormControl('' , Validators.required), 
    });
   }

  ngOnInit(): void {
  }

      
  get f(){
    return this.form.controls;
  }
  
  submit(){ 
    const amount = this.form.controls['amount'].value;
    const deposit = this.form.controls['deposit'].value;
    const rate = this.form.controls['interest'].value;
    const months = this.form.controls['term'].value; 
    const ramount = amount - deposit;
   
  
    // Calculating interest per month
    const interest = (ramount * (rate * 0.01)) / months;
      
    // Calculating total payment
    const total = ((ramount / months) + interest).toFixed(2);

    this.mortgate = total; 
  }

}
