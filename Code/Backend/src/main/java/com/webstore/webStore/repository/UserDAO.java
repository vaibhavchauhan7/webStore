package com.webstore.webStore.repository;

import com.webstore.webStore.entity.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserDAO {

    List<User> getUsers();

    User getUserByID(long userID);
}
