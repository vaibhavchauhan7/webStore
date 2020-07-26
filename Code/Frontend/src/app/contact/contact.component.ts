import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

    @ViewChild('contactForm', {read: true, static: false}) contactForm: NgForm;

    constructor() {
    }

    ngOnInit(): void {
    }

    onSubmit() {
        alert('Form Successfully Submitted!');
    }

}
