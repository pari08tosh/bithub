import {
  Component,
  AfterViewInit,
  EventEmitter,
  OnDestroy,
  Input,
  Output
} from '@angular/core';

import 'tinymce';
import 'tinymce/themes/modern';

import 'tinymce/plugins/table';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';

declare var tinymce: any;

@Component({
  selector: 'app-tiny-editor',
  template: `<textarea id="tiny"></textarea>
  {{body}}`
})
export class TinyEditorComponent implements AfterViewInit, OnDestroy {

  body: String;


  @Input() elementId: String;
  @Output() onEditorContentChange = new EventEmitter();
  editor;

  ngAfterViewInit() {
    tinymce.init({
      selector: '#tiny',
      plugins: ['link', 'table', 'image'],
      skin_url: 'assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup change', () => {
          this.body = editor.getContent();
          console.log(this.body);
        });
      }
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
