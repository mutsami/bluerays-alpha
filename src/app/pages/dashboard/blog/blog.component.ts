import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  blogs!:any[]; 
  listings:any;  
  userData:any;
  user:any;

  constructor(private formBuilder: FormBuilder,public auth:AuthService,private _router: Router) {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      cover_image: new FormControl('', [Validators.required, Validators.minLength(3)]),
      category: new FormControl('', [Validators.required, Validators.minLength(3)]), 
      uploaded: new FormControl(''), 
      description: new FormControl('', [Validators.required ]) ,
      htmlContent: new FormControl('')
    });

    
    this.userData = localStorage.getItem('user');
    this.user = JSON.parse(this.userData); 

    this.auth.getBlogs().subscribe(e=>{
      this.blogs = e;
    }) 
    this.auth.getMyListings(this.user.uid).subscribe(e=>{ 
      this.listings = e;      
    })
  }
  ngOnInit(){ 
  }


  saveListing(id: any){
    
    console.log('saved id', id)
  }
  
  get f(){
    return this.form.controls;
  }
  
  submit(){
    this.form.patchValue({
      uploaded: this.auth.ts 
    });
    this.auth.createBlog(this.form.value).then(()=>{

      this._router.routeReuseStrategy.shouldReuseRoute = () => false;
      this._router.onSameUrlNavigation = 'reload';
      this._router.navigate(['dashboard/blog']).then(()=>{ 
        // this.notifyService.showSuccess("The blog has been created succefully.", "Saved!!")
    })
    })
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    width:'900px',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

}
