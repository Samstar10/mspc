import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostsService } from './posts.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    HttpClientModule
  ],
  providers: [PostsService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private authService: AuthService){}
  OnInit() {
    this.authService.autoAuthUser()
  }
}


// In this parent component, since it's the common point between the two child components, we make the adding
// function here and pass it to the child component through property and event binding.
// The posts in the post list is binded to the storedPosts and post created is binded to the onPostAdded function