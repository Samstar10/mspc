import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent {
  enteredValue = '';
  newPost = 'NO CONTENT'

  onAddPost() {
    this.newPost = this.enteredValue
  }

}
