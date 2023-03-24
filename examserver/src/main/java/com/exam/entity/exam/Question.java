package com.exam.entity.exam;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
@Table(name="question")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long quesId;

    private String image;
    private String answer;
    @Column(length = 5000)
    private String content;
    private String option1;
    private String option2;
    private String option3;
    private String option4;

    //@Transient will not save this field in DB
    @Transient
    private String givenAnswer;

    @ManyToOne(fetch = FetchType.EAGER)
    private Quiz quiz;

    //constructor
    public Question() {
    }
    public Question(String answer, String content, String image, String option1, String option2, String option3,
                    String option4, Quiz quiz) {
        this.answer = answer;
        this.content = content;
        this.image = image;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
        this.quiz = quiz;
    }

    //getters and setters
    public Long getQuesId() {
        return quesId;
    }

    public void setQuesId(Long quesId) {
        this.quesId = quesId;
    }

    /*
    -SERIALIZATION is when our object gets converted into json. (when UI gets data from API - serialization happens)
    -When we are serializing, we want to hide the property.
     */
//    @JsonIgnore //this will not show the field while inspecting in UI, this will ignore the field while serialization
    //removed JsonIgnore, because it wont be showing to the Admin also. we set answer as "" in controller get API
    public String getAnswer() {
        return answer;
    }

    /*
    -When we save our data, data gets converted from json to object
    -When UI send data to make API calls, data gets converted from json to object = Deserialization
    -When we are deserializing, we want to keep the property
     */
//     @JsonProperty("answer")
    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getOption1() {
        return option1;
    }

    public void setOption1(String option1) {
        this.option1 = option1;
    }

    public String getOption2() {
        return option2;
    }

    public void setOption2(String option2) {
        this.option2 = option2;
    }

    public String getOption3() {
        return option3;
    }

    public void setOption3(String option3) {
        this.option3 = option3;
    }

    public String getOption4() {
        return option4;
    }

    public void setOption4(String option4) {
        this.option4 = option4;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }

    public String getGivenAnswer() {
        return givenAnswer;
    }

    public void setGivenAnswer(String givenAnswer) {
        this.givenAnswer = givenAnswer;
    }
}
