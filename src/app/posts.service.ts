import { Injectable } from '@angular/core';
import { Post } from './post';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = []
  private postsUpdated = new Subject<{posts: Post[], maxPosts: number}>()

  constructor(private http: HttpClient, private router: Router) { }

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`
    this.http.get<{message: string, posts: any, maxPosts: number}>('http://localhost:3000/api/posts' + queryParams)
    .pipe(map((postData: any) => {
      return {posts: postData.posts.map((post: any) => {
        return {
          title: post.title,
          content: post.content,
          id: post._id,
          imagePath: post.imagePath
        }
      }), maxPosts: postData.maxPosts}
    }))
    .subscribe((posts) => {
      this.posts = posts.posts
      this.postsUpdated.next({posts: [...this.posts], maxPosts: posts.maxPosts})
    })
  }

  getPost(id: string) {
    return this.http.get<{_id: string, title: string, content: string, imagePath: string}>("http://localhost:3000/api/posts/" + id)
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable()
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData()
    postData.append('title', title)
    postData.append('content', content)
    postData.append('image', image, title)
    this.http.post<{message: string, post: Post}>('http://localhost:3000/api/posts', postData)
    .subscribe((res) => {
      this.router.navigate(['/'])
    })
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData!: Post | FormData
    if (typeof(image) === 'object') {
      postData = new FormData()
      postData.append('id', id)
      postData.append('title', title)
      postData.append('content', content)
      postData.append('image', image, title)
    }else{
      postData ={
        id: id,
        title: title,
        content: content,
        imagePath: image
      }
    }
    this.http.put('http://localhost:3000/api/posts/' + id, postData)
    .subscribe((resp) => {
      this.router.navigate(['/'])
    })
  }

  deletePost(postId: string) {
    return this.http.delete('http://localhost:3000/api/posts/' + postId)
  }
  
}
