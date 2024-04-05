import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { Post } from '../../post';
import { PostsService } from '../../posts.service';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    MatExpansionModule,
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    HttpClientModule
  ],
  providers: [PostsService],
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
  isLoading = false
  totalPosts = 0
  postsPerPage = 2
  currentPage = 1
  pageSizeOptions = [1, 2, 5, 10]
  userIsAuthenticated = false
  private postsSub!: Subscription
  private authStatusSub!: Subscription

  constructor(public service: PostsService, private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true
    this.service.getPosts(this.postsPerPage, this.currentPage)
    this.postsSub = this.service.getPostUpdateListener().subscribe((postData: {posts: Post[], maxPosts: number}) => {
      this.isLoading = false
      this.totalPosts = postData.maxPosts
      this.posts = postData.posts
    })
    this.userIsAuthenticated = this.authService.getIsAuth()
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated
      })
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true
    this.currentPage = pageData.pageIndex + 1
    this.postsPerPage = pageData.pageSize
    this.service.getPosts(this.postsPerPage, this.currentPage)
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe()
  }

  onDelete(id: string) {
    this.isLoading = true
    this.service.deletePost(id).subscribe(() => {
      this.service.getPosts(this.postsPerPage, this.currentPage)
    })
  }
}

// In this post list component we instantiate the posts array with an empty array and make it bindable from the
// parent using the @Input() decorator
// In short. We open it up to receive values from it's parent component.