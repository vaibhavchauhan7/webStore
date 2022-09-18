package com.webstore.webStore.contact;

import com.webstore.webStore.contact.entity.Contact;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
@RestController
public class ContactController {

    private final ContactRepository contactRepository;

    @PostMapping("/contact")
    private void customerContact(@RequestBody Contact contactFormData) {
        contactRepository.save(contactFormData);
    }

}
