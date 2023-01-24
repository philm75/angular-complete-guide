import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStore(title: string, content: string) {
    const postData: Post = {
      title,
      content
    };

    this.http.post(
      'https://complete-angular-f71b0-default-rtdb.firebaseio.com/posts.json',
      postData
    ).subscribe(response => console.log(response),
    error => {
      this.error.next(error.message)
    });
  }

  fetchPosts() {
    return this.http.get<{[key: string]: Post}>(
      'https://complete-angular-f71b0-default-rtdb.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders({"Custom-header": "Hello"}),
        params: new HttpParams().set('print', 'pretty')
      }
    )
    .pipe(
      map((responseData: {[key: string]: Post}) => {
        const posts: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            posts.push({...responseData[key], id: key});
          }
        }
        return posts;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  deletePosts() {
    return this.http.delete('https://complete-angular-f71b0-default-rtdb.firebaseio.com/posts.json',
    {
      observe: 'events'
    }).pipe(
      tap(event => {
        console.log(event);
      })
    );
  }
}
