package com.webstore.webStore.service;

import com.webstore.webStore.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("userService")
public interface UserService {

    List<User> getUsers();

    User getUserByID(long userID);
}
