import { Component } from '@angular/core';
import { FileListComponent } from './components/file-list/file-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FileListComponent],
  template: `<app-file-list></app-file-list>`,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'file-renamer-frontend';
}
