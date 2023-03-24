package com.exam.controller;

import com.exam.entity.exam.Question;
import com.exam.entity.exam.Quiz;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/question")
@CrossOrigin("*")
public class QuestionController {

    @Autowired
    private QuestionService questionService;
    @Autowired
    private QuizService quizService;

    //addQuestion
    @PostMapping("/")
    public ResponseEntity<Question> addQuestion(@RequestBody Question question){
        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }

    //updateQuestion
    @PutMapping("/")
    public ResponseEntity<?> updateQuestion(@RequestBody Question question){
        return ResponseEntity.ok(this.questionService.updateQuestion(question));
    }

    //getQuestion
    @GetMapping("/")
    public ResponseEntity<?> getQuestion() {
        return ResponseEntity.ok(this.questionService.getQuestion());
    }

    //getQuestion
    @GetMapping("/{questionId}")
    public ResponseEntity<?> getQuestion(@PathVariable("questionId") Long questionId){
        return ResponseEntity.ok(this.questionService.getQuestion(questionId));
    }

    //get noOfQuestions Questions of any Quiz
    @GetMapping("/quiz/{qid}")
    public ResponseEntity<?> getQuestionOfQuiz(@PathVariable("qid") Long qid){
        Quiz quiz = this.quizService.getQuiz(qid);
        Set<Question> questions = quiz.getQuestion();
        List<Question> list = new ArrayList(questions);
        Collections.shuffle(list);
        if(list.size() > Integer.parseInt(quiz.getNumberOfQuestions())){
            list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions() + 1));
        }

        //Admin is not using this api, This API is used while giving quiz.
        // so we are setting answer as "", so that user cant inspect element the answer.
        list.forEach((q)->{
            q.setAnswer("");
        });

        Collections.shuffle(list);
        return ResponseEntity.ok(list);
    }

    //get all questions of a quiz
    @GetMapping("/quiz/all/{qid}")
    public ResponseEntity<?> getAllQuestionOfQuiz(@PathVariable("qid") Long qid){
        Quiz quiz = new Quiz();
        quiz.setQid(qid);
        Set<Question> questionOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
        return ResponseEntity.ok(questionOfQuiz);
    }


    //delete Question
    @DeleteMapping("/{questionId}")
    public void deleteQuestion(@PathVariable("questionId") Long questionId){
        this.questionService.deleteQuestion(questionId);
    }

    //evaluate quiz
    @PostMapping("/evalQuiz")
    public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions)
    {
        System.out.println(questions);
        double marksGot = 0;
        Integer correctAnswers = 0;
        Integer attemptedQuestions = 0;
        for (Question q : questions) {
            //single question
            Question question = this.questionService.getQuestion(q.getQuesId());
            if(question.getAnswer().equals(q.getGivenAnswer()))
            {
                //correct
                correctAnswers++;
                double marksSingle = Double.parseDouble(questions.get(0).getQuiz().getMaxMarks()) /questions.size();
                marksGot += marksSingle;
            }
            if(q.getGivenAnswer()!=null){
                attemptedQuestions++;
            }
        };

        Map<Object, Object> map = Map.of("marksGot",marksGot, "correctAnswers",correctAnswers, "attemptedQuestions", attemptedQuestions);
        return ResponseEntity.ok(map);
    }
}


