package com.webstore.webStore.shared.contact;

import com.webstore.webStore.shared.contact.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Integer> {
}
