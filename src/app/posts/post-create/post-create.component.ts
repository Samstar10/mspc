import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Post } from '../../post';
import { PostsService } from '../../posts.service';
import { ActivatedRoute, RouterModule, Router, ParamMap } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  providers: [PostsService],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent {
  private mode = 'create';
  private postId: any
  post!: any; 
  isLoading = false;
  form!: FormGroup;
  imagePreview!: string

  constructor(public service: PostsService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      content: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    })
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.has('id')) {
        this.mode = 'edit'
        this.postId = params.get('id')
        this.isLoading = true
        this.service.getPost(this.postId).subscribe(postData => {
          this.isLoading = false
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath: postData.imagePath
          }
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.imagePath
          })
        })
        console.log(this.post)
      }else {
        this.mode = 'create'
        this.postId = null
      }
    })
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files![0]
    this.form.patchValue({image: file})
    this.form.get('image')?.updateValueAndValidity()
    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result as string
    }
    reader.readAsDataURL(file)
  }

  onSavePost() {
    if (this.form.invalid) {
      return
    }
    this.isLoading = true
    if(this.mode === 'create') {
      this.service.addPost(this.form.value.title, this.form.value.content, this.form.value.image)
    }else {
      this.service.updatePost(this.postId, this.form.value.title, this.form.value.content, this.form.value.image)
    }

    // Resetting the form
    this.form.reset()
  }
}


// One post created and emitted as an event
// The @output decorator is used to emit an event and makes our post available outside the component
// The emit() method is used to emit the event i.e make the post available outside the component