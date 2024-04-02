import { Injectable } from '@angular/core';
import { Post } from './post';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = []
  private postsUpdated = new Subject<Post[]>()

  constructor(private http: HttpClient) { }

  getPosts() {
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
    .pipe(map((postData: any) => {
      return postData.posts.map((post: any) => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        }
      })
    }))
    .subscribe((posts) => {
      this.posts = posts
      this.postsUpdated.next([...this.posts])
    })
  }

  getPost(id: string) {
    return this.http.get<{_id: string, title: string, content: string}>("http://localhost:3000/api/posts/" + id)
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable()
  }

  addPost(title: string, content: string) {
    const post: Post = {
      id: '',
      title: title,
      content: content
    }
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
    .subscribe((res) => {
      const postId = res.postId
      post.id = postId
      this.posts.push(post)
      this.postsUpdated.next([...this.posts])
    })
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = {
      id: id,
      title: title,
      content: content
    }
    this.http.put('http://localhost:3000/api/posts/' + id, post)
    .subscribe((resp) => {
      const updatedPosts = [...this.posts]
      const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id)
      updatedPosts[oldPostIndex] = post
      this.posts = updatedPosts
      this.postsUpdated.next([...this.posts])
    })
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
    .subscribe(() => {
      const updatedPosts = this.posts.filter(post => post.id !== postId)
      this.posts = updatedPosts
      this.postsUpdated.next([...this.posts])
    })
  }
  
}
