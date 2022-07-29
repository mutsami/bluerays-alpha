import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-blog-editpage',
  templateUrl: './blog-editpage.component.html',
  styleUrls: ['./blog-editpage.component.css']
})
export class BlogEditpageComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  blog!:any; 
  private routeSub!: Subscription;
  blog_id: any;


  constructor(private formBuilder: FormBuilder,public auth:AuthService,private route: ActivatedRoute) {
    
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      cover_image: new FormControl('', [Validators.required, Validators.minLength(3)]),
      category: new FormControl('', [Validators.required, Validators.minLength(3)]),  
      description: new FormControl('', [Validators.required ]) ,
      edited: new FormControl(''),
      htmlContent: new FormControl('')
    });

    this.route.params.subscribe(params => {  

      this.blog_id = params['id'];
      
      this.auth.getBlog(params['id']).subscribe(e=>{

        this.blog = e;


        this.form.markAllAsTouched();

        this.form.patchValue({
         title: this.blog.title,
         cover_image: this.blog.cover_image,
         category: this.blog.category,
         description: this.blog.description,
         htmlContent: this.blog.htmlContent,

        });

        
      })
    });
    
  }
  ngOnInit(){ 
  }


  
  get f(){
    return this.form.controls;
  }
  
  submit(id: any){
    this.form.patchValue({
      edited: this.auth.ts 
    });
    this.auth.updateBlog(id,this.form.value) 
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
