import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { Post } from '../../post';
import { PostsService } from '../../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    MatExpansionModule,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {
  // posts = [
  //   { title: 'First Post', content: 'This is the first post\'s content' },
  //   { title: 'Second Post', content: 'This is the second post\'s content' },
  //   { title: 'Third Post', content: 'This is the third post\'s content' }
  // ]

  // Making it bindable from the parent
  posts: Post[] = []
  private postsSub!: Subscription

  constructor(public service: PostsService) { }

  ngOnInit() {
    this.posts = this.service.getPosts()
    this.postsSub = this.service.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.posts = posts
    })
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe()
  }
}

// In this post list component we instantiate the posts array with an empty array and make it bindable from the
// parent using the @Input() decorator
// In short. We open it up to receive values from it's parent component.