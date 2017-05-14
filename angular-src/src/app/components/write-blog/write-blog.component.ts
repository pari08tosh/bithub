import {
  Component,
  AfterViewInit,
  EventEmitter,
  OnDestroy,
  Input,
  Output,
  OnInit,
} from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/table';
import 'tinymce/plugins/link';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/image'

declare var tinymce: any;

@Component({
  selector: 'app-write-blog',
  templateUrl: './write-blog.component.html',
  styleUrls: ['./write-blog.component.css']
})
export class WriteBlogComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() elementId: String;
  @Output() onEditorContentChange = new EventEmitter();
  editor;
  heading: String;
  body: String;
  tags: String[] = [];
  tag: string;

  constructor(
    private blogService: BlogService,
    private flashMessagesService: FlashMessagesService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    tinymce.init({
      selector: '#body',
      plugins: ['link', 'table', 'paste', 'image'],
      skin_url: 'assets/skins/lightgray',
      paste_data_images: true,
      setup: editor => {
        this.editor = editor;
        editor.on('keyup change', () => {
          this.body = editor.getContent();
          this.onEditorContentChange.emit(this.body);
        });
      }
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

  addTag() {
    this.tags.push(this.tag);
    this.tag = '';
  }

  removeTag(tag) {
    for(let ii = 0; ii < this.tags.length; ii++) {
      if (this.tags[ii] === tag) {
        this.tags.splice(ii, 1);
        break;
      }
    }
  }

  submitBlog() {
    const blog = {
      heading: this.heading,
      body: this.body,
      tags: this.tags,
      username: JSON.parse(localStorage.getItem('user')).username,
    }
    this.blogService.addBlog(blog).subscribe(data => {
      if (data.success) {
        this.flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 1500 });
        this.router.navigate(['/blogs'], { queryParams: { pn: 0 }});
      } else {
        this.flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 1500 });
        this.router.navigate(['/writeBlog']);
      }
    }, err => {
      this.flashMessagesService.show("An error occured. Maybe your blog size is too large. Remove some images", { cssClass: 'alert-danger', timeout: 1500 });
    });
  }

}
