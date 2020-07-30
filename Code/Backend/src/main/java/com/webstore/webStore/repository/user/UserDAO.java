package com.webstore.webStore.repository.user;

import com.webstore.webStore.entity.user.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserDAO {

    List<User> getUsers();

    User getUserByID(int userID);
}
