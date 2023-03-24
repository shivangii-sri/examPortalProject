package com.exam.entity.exam;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name="category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long cid;
    private String title;
    private String description;

    /*
    * About Json Ignore :
    * We are putting JsonIgnore to avoid 'CYCLIC Dependency' from Category to Quiz as:
    * When we will fetch category by id, it will try to fetch all quizes and in quizzes we have category column so
    * that will fetch category again.!
    */
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Quiz> quizzes = new LinkedHashSet<>();

    //Cosntructors
    public Category() {
    }
    public Category(String title, String description) {
        this.title = title;
        this.description = description;
    }

    //Getters Setters

    public Long getCid() {
        return cid;
    }

    public void setCid(Long cid) {
        this.cid = cid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
            return description;
    }

    public void setDescription(String description) {
            this.description = description;
    }
}
