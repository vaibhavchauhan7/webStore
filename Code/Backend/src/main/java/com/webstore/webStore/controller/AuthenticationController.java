package com.webstore.webStore.controller;

import com.webstore.webStore.entity.User;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class AuthenticationController {

    private void createNewFile() {
        try {
            File myObj = new File("DummyDB.txt");
            if (myObj.createNewFile()) {
                System.out.println("File created: " + myObj.getName());
            } else {
                System.out.println("File already exists.");
            }
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }

    @PostMapping("/sign-up")
    public User onSignUp(@RequestBody User user) {
        this.createNewFile();
        try {
            FileWriter myWriter = new FileWriter("DummyDB.txt", true);
            myWriter.write("Name: " + user.getName() + ", Email: " + user.getEmail() + "\n");
            myWriter.close();
        } catch (IOException e) {
            System.out.println("An error occurred!");
            e.printStackTrace();
        }
        return user;
    }

    @GetMapping("/login")
    public void onLogin() {
        System.out.println("Login Successful!");
    }

}
