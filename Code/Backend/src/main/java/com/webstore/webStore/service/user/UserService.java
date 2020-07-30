package com.webstore.webStore.service.user;

import com.webstore.webStore.entity.user.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("userService")
public interface UserService {

    List<User> getUsers();

    User getUserByID(int userID);
}
