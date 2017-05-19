import {
  Component,
  AfterViewInit,
  EventEmitter,
  OnDestroy,
  Input,
  Output
} from '@angular/core';

declare var tinymce: any;

@Component({
  selector: 'app-tiny-editor',
  template: `
  <div class="form-group">
    <label for="body">Main Body</label>
    <textarea style="height: 40vh" id="body" name="body" class="form-control"></textarea>
  </div>`
})
export class TinyEditorComponent implements AfterViewInit, OnDestroy {
  @Output() onEditorContentChange = new EventEmitter();

  editor;

  ngAfterViewInit() {
    tinymce.init({
      selector: '#body',
      plugins: ['link', 'table', 'paste', 'image'],
      skin_url: 'assets/skins/lightgray',
      paste_data_images: true,
      setup: editor => {
        this.editor = editor;
        editor.on('keyup change', () => {
          const content = editor.getContent();
          this.onEditorContentChange.emit(content);
        });
      }
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
