package com.webstore.webStore.service;

import com.webstore.webStore.entity.User;
import com.webstore.webStore.repository.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("userService")
public class UserServiceImpl implements UserService {

    @Autowired
    UserDAO userDAO;

    @Override
    public List<User> getUsers() {
        return userDAO.getUsers();
    }

    @Override
    public User getUserByID(long userID) {
        return userDAO.getUserByID(userID);
    }
}
