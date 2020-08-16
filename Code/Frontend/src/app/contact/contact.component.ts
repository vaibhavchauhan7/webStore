import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

    @ViewChild('contactForm') contactForm: NgForm;

    constructor() {
    }

    ngOnInit(): void {
    }

    onSubmit(contactForm: NgForm): void {
        alert('Form Successfully Submitted!');
        this.contactForm.reset();
    }
}
