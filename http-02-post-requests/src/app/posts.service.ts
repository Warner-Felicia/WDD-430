import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';

import { Post } from './post.model';
import { Subject, throwError } from "rxjs";


@Injectable({ providedIn: 'root' })
export class PostService {
    error = new Subject<string>();

    constructor(private http: HttpClient) { }

    createAndStorePost(title: string, content: string) {
        const postData: Post = { title: title, content: content };
        this.http.post<{ name: string }>(
            'https://ng-complete-guide-3f981-default-rtdb.firebaseio.com/posts.json',
            postData,
            {
                observe: 'response'
            }
        )
            .subscribe(responseData => {
                console.log(responseData);
            }, error => {
                this.error.next(error.message);
            });
    }

    fetchPosts() {
        let searchParams = new HttpParams()
            .set('print', 'pretty')
            .set('custom', 'key');
        return this.http
            .get<{ [key: string]: Post }>(
                'https://ng-complete-guide-3f981-default-rtdb.firebaseio.com/posts.json',
                {
                    headers: new HttpHeaders({ "Custom-Header": "Hello" }),
                    params: searchParams,
                    responseType: 'json'
                })
            .pipe(
                map(responseData => {
                    const postsArray: Post[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            postsArray.push({ ...responseData[key], id: key })
                        }
                    }
                    return postsArray;
                }),
                catchError(errorRes => {
                    //send to analytics server
                    return throwError(errorRes);
                })
            )
    }

    deletePosts() {
        return this.http.delete(
            'https://ng-complete-guide-3f981-default-rtdb.firebaseio.com/posts.json',
            {
                observe: 'events',
                responseType: 'text'
            }
        ).pipe(tap(event => {
            console.log(event);
            if (event.type === HttpEventType.Sent) {
                // ..
            }
            if (event.type === HttpEventType.Response) {
                console.log(event.body);
            }
        }));
    }
}