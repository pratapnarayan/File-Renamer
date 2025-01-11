package com.filerenamer.filerenamer.model;

public class FileDetails {
    private String originalName;
    private String suggestedName;

    public FileDetails(String originalName, String suggestedName) {
        this.originalName = originalName;
        this.suggestedName = suggestedName;
    }

    public String getOriginalName() {
        return originalName;
    }

    public void setOriginalName(String originalName) {
        this.originalName = originalName;
    }

    public String getSuggestedName() {
        return suggestedName;
    }

    public void setSuggestedName(String suggestedName) {
        this.suggestedName = suggestedName;
    }
}