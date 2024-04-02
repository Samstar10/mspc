import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import{ MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Post } from '../../post';
import { PostsService } from '../../posts.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

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
    RouterModule
  ],
  providers: [PostsService],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent {
  private mode = 'create';
  private postId: any

  constructor(public service: PostsService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.mode = 'edit'
        this.postId = params.get('id')
      }else {
        this.mode = 'create'
        this.postId = null
      }
    })
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return
    }
    
    this.service.addPost(form.value.title, form.value.content)

    // Resetting the form
    form.resetForm()

    this.router.navigate([''])
  }
}


// One post created and emitted as an event
// The @output decorator is used to emit an event and makes our post available outside the component
// The emit() method is used to emit the event i.e make the post available outside the component