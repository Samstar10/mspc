import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import{ MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = ''
  // Emit our own event
  @Output() postCreated = new EventEmitter()

  onAddPost() {
    const post = {
      title: this.enteredTitle,
      content: this.enteredContent
    }
    // Emit the event
    this.postCreated.emit(post)
    // Then use it in the parent component
  }

}


// One post created and emitted as an event
// The @output decorator is used to emit an event and makes our post available outside the component
// The emit() method is used to emit the event i.e make the post available outside the component