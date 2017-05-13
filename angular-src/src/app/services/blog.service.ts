import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BlogService {

  serverAddress: String;
  token: any;

  constructor(private http: Http) {
     this.serverAddress = 'localhost:3000';
   }

   getBlogCount(blogInfo) {
     let headers = new Headers;
     headers.append('Content-Type', 'application/json');
     this.token = localStorage.getItem('id_token');
     headers.append('Authorization', this.token);
     return this.http.post('http://' + this.serverAddress + '/blogs/countBlogs', blogInfo, {headers: headers})
       .map(res => res.json());
   }

  getBlogs(blogInfo) {
    let headers = new Headers;
    headers.append('Content-Type', 'application/json');
    this.token = localStorage.getItem('id_token');
    headers.append('Authorization', this.token);
    return this.http.post('http://' + this.serverAddress + '/blogs', blogInfo, {headers: headers})
      .map(res => res.json());
  }

  getBlogById(blog) {
    let headers = new Headers;
    headers.append('Content-Type', 'application/json');
    this.token = localStorage.getItem('id_token');
    headers.append('Authorization', this.token);
    return this.http.post('http://' + this.serverAddress + '/blogs/getBlogById', blog, {headers: headers})
      .map(res => res.json());
  }

  getBlogByUsername(user) {
    let headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://' + this.serverAddress + '/blogs/getBlogByUsername', user, {headers: headers})
      .map(res => res.json());
  }

  addBlog(blog) {
    let headers = new Headers;
    headers.append('Content-Type', 'application/json');
    this.token = localStorage.getItem('id_token');
    headers.append('Authorization', this.token);
    return this.http.post('http://' + this.serverAddress + '/blogs/addBlog', blog, {headers: headers})
      .map(res => res.json());
  }

}
