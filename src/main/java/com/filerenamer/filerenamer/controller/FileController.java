package com.filerenamer.filerenamer.controller;

import com.filerenamer.filerenamer.model.FileDetails;
import com.filerenamer.filerenamer.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/files")
public class FileController {

    @Autowired
    private FileService fileService;

    @GetMapping("/list")
    public ResponseEntity<List<FileDetails>> listFiles(@RequestParam String directoryPath) {
        List<FileDetails> filesList = fileService.listFilesInDirectory(directoryPath);
        return ResponseEntity.ok(filesList);
    }

    @PostMapping("/rename")
    public ResponseEntity<String> renameFile(@RequestParam String directoryPath,
                                             @RequestParam String originalName,
                                             @RequestParam String suggestedName) {
        boolean success = fileService.renameFile(directoryPath, originalName, suggestedName);
        if (success) {
            return ResponseEntity.ok("File renamed successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to rename file.");
        }
    }
}