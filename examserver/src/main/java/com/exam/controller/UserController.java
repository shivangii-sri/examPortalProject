package com.exam.controller;

import com.exam.entity.Role;
import com.exam.entity.User;
import com.exam.entity.UserRole;
import com.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/user")
@CrossOrigin("*") //->this is added because springboot and angular were are running on different ports
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    /*
    changes for this are also added in MySecurityConfig
     */
    @GetMapping("/test")
    public String test() {
        return "Welcome to backend API of ExamPortal";
    }

    //creating user
    @PostMapping("/")
    public User createUser(@RequestBody User user) throws Exception {
        /*
            This API wont create Admin Users
         */
        user.setProfile("default.png");
        //encoding password with bcrypt password encoder

        user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));

        Set<UserRole> userRolesSet = new HashSet<>();
        Role role = new Role(45L , "NormalUser");
        UserRole userRole = new UserRole(user, role);
        userRolesSet.add(userRole);

        return this.userService.createUser(user, userRolesSet);
    }

    @GetMapping("/{userName}")
    public User getUser(@PathVariable("userName") String userName) throws Exception {
        return this.userService.getUser(userName);
    }

    //Delete the User by id
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") Long userId)
    {
        this.userService.deleteUser(userId);
    }

    //Delete the user by username
    @DeleteMapping("/deleteUserByUsername/{username}")
    public void deleteUserByUsername(@PathVariable("username") String username)
    {
        this.userService.deleteUserByUsername(username);
    }

    //Update user by user id
    @PutMapping("/updateUser")
    public void updateUser(@RequestBody User userDto) throws Exception
    {
        this.userService.updateUser(userDto);
    }
}
