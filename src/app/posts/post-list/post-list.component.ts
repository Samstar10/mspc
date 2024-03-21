import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    MatExpansionModule
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {
  posts = [
    { title: 'First Post', content: 'This is the first post\'s content' },
    { title: 'Second Post', content: 'This is the second post\'s content' },
    { title: 'Third Post', content: 'This is the third post\'s content' }
  ]
}
