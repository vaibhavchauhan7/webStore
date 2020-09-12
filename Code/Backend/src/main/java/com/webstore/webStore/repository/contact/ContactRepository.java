package com.webstore.webStore.repository.contact;

import com.webstore.webStore.entity.contact.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Integer> {
}
