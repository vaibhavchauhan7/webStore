package com.webstore.webStore.controller;

import com.webstore.webStore.entity.Contact;
import com.webstore.webStore.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class ContactController {

    private final ContactRepository contactRepository;

    @Autowired
    private ContactController(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @PostMapping("/contact")
    private void customerContact(@RequestBody Contact contactFormData) {
        contactRepository.save(contactFormData);
    }
}
