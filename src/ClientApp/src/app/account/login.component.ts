﻿import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux } from '@angular-redux/store';
import { NgForm } from '@angular/forms';
import { VoidwellApi } from '../shared/services/voidwell-api.service';
import { IAppState } from '../app.component';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'voidwell-login',
    templateUrl: './login.template.html',
    styleUrls: ['../app.styles.css'],
    providers: [VoidwellApi]
})

export class LoginComponent implements OnDestroy {
    self = this;
    errorMessage: string = null;

    constructor() {
    }

    onSubmit(loginForm: NgForm) {
        console.log('submit', loginForm.value);
    }

    ngOnDestroy() {

    }
}