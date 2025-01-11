import { Component } from '@angular/core';
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FileDetails {
    originalName: string;
    suggestedName: string;
    selected: boolean; // Add the selected property
}

@Component({
    selector: 'app-file-list',
    templateUrl: './file-list.component.html',
    styleUrls: ['./file-list.component.css'],
    imports: [CommonModule, FormsModule]
})
export class FileListComponent {
    directoryPath: string = '';
    files: FileDetails[] = [];
    selectedFiles: string[] = [];
    error: string = '';

    toggleSelectAll(event: Event): void {
        const checked = (event.target as HTMLInputElement).checked;
        this.files.forEach(file => (file.selected = checked));
    }

    isAllSelected(): boolean {
        return this.files.length > 0 && this.files.every(file => file.selected);
    }

    handleDirectoryChange(event: Event) {
        const input = event.target as HTMLInputElement;
        const files = input.files;

        if (files && files.length > 0) {
            this.error = '';
            this.files = Array.from(files).map(file => ({
                originalName: file.name,
                suggestedName: file.name,
                selected: false, // Initialize selected property
            }));
            this.directoryPath = 'Selected Directory'; // Placeholder since no path is available
        } else {
            this.error = 'Please select a valid directory.';
            this.directoryPath = '';
            this.files = [];
        }
    }

    listFilesInDirectory(path: string) {
        axios.get(`http://localhost:8080/api/files/list?directoryPath=${path}`)
            .then(response => {
                this.files = response.data.map((file: any) => ({
                    ...file,
                    selected: false, // Initialize selected property
                }));
            })
            .catch(err => {
                this.error = 'Failed to list files.';
            });
    }

    toggleFileSelection(filename: string) {
        const file = this.files.find(f => f.originalName === filename);
        if (file) {
            file.selected = !file.selected;
        }
    }

    renameSelectedFiles() {
        const selectedFiles = this.files.filter(file => file.selected);

        for (const file of selectedFiles) {
            axios.post(`http://localhost:8080/api/files/rename`, null, {
                params: {
                    directoryPath: this.directoryPath,
                    originalName: file.originalName,
                    suggestedName: file.suggestedName
                }
            })
                .then(response => {
                    console.log(response.data);
                })
                .catch(err => {
                    this.error = 'Failed to rename files.';
                });
        }

        this.clearSelection();
        alert('Files renamed successfully!');
        this.listFilesInDirectory(this.directoryPath);
    }

    clearSelection() {
        this.files.forEach(file => (file.selected = false));
    }
}