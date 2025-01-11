package com.filerenamer.filerenamer.service;

import com.filerenamer.filerenamer.model.FileDetails;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service
public class FileService {

    public List<FileDetails> listFilesInDirectory(String directoryPath) {
        List<FileDetails> filesList = new ArrayList<>();
        File directory = new File(directoryPath);
        if (directory.exists() && directory.isDirectory()) {
            File[] files = directory.listFiles();
            if (files != null) {
                for (File file : files) {
                    if (file.isFile() && file.getName().matches(".*[^a-zA-Z0-9.-].*")) {
                        String suggestedName = file.getName().replaceAll("[^a-zA-Z0-9.-]", "");
                        filesList.add(new FileDetails(file.getName(), suggestedName));
                    }
                }
            }
        }
        return filesList;
    }

    public boolean renameFile(String directoryPath, String originalName, String suggestedName) {
        File file = new File(directoryPath, originalName);
        File newFile = new File(directoryPath, suggestedName);
        return file.renameTo(newFile);
    }
}