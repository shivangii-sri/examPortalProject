package com.exam.service.impl;

import com.exam.entity.User;
import com.exam.entity.UserRole;
import com.exam.helper.UserFoundException;
import com.exam.repo.RoleRepository;
import com.exam.repo.UserRepository;
import com.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    //creating user
    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {

        User local = this.userRepository.findByUserName(user.getUserName());
        if(local != null){
            System.out.println("User is already there!!");
            throw new UserFoundException();
        }
        else{
            //user create
            for(UserRole ur : userRoles)
            {
                roleRepository.save(ur.getRole());
            }
            user.getUserRoles().addAll(userRoles);
            local = this.userRepository.save(user);
        }
        return local;
    }

    @Override
    public User getUser(String userName) throws Exception {
        User user = this.userRepository.findByUserName(userName);

        if(user == null){
            System.out.println("User does not exist!!");
            throw new Exception("User does not exist");
        }
        return user;
    }

    @Override
    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }

    //delete user by username
    @Override
    public void deleteUserByUsername(String username) {

        User user = userRepository.findByUserName(username);
        Long userId = user.getId();
        this.userRepository.deleteById(userId);
    }

    @Override
    public void updateUser(User userDto) throws Exception {

        User existingUser = this.userRepository.findByUserId(userDto.getId());

        //if the passed username already exist in User table, then its id should be equal id of user details we get for input userid
        if(userRepository.findByUserName(userDto.getUserName()) != null && userDto.getId() != existingUser.getId() )
        {
            System.out.println("Cant use this username!");
            throw new Exception("Cant use this username!");
        }

        if(userDto.getUserName()!=null && !userDto.getUserName().isEmpty() ) existingUser.setUserName(userDto.getUserName());
        if(userDto.getFirstName()!=null && !userDto.getFirstName().isEmpty()) existingUser.setFirstName(userDto.getFirstName());
        if(userDto.getLastName()!=null && !userDto.getLastName().isEmpty()) existingUser.setLastName(userDto.getLastName());
        if(userDto.getEmail()!=null && !userDto.getEmail().isEmpty()) existingUser.setEmail(userDto.getEmail());
        if(userDto.getPhone()!=null && !userDto.getPhone().isEmpty()) existingUser.setPhone(userDto.getPhone());
        if(userDto.getProfile()!=null && !userDto.getProfile().isEmpty()) existingUser.setProfile(userDto.getProfile());
        if(userDto.getPassword()!=null && !userDto.getUserName().isEmpty()) existingUser.setPassword(userDto.getPassword());
        if(userDto.getUserRoles()!=null  && !userDto.getUserRoles().isEmpty()) existingUser.setUserRoles(userDto.getUserRoles());

        userRepository.save(existingUser);
    }
}
