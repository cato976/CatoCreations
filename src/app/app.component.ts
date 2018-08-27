import { Component } from '@angular/core';
import { EnvironmentSpecificService } from './_services/environment-specific.service';
import { EnvSpecific } from './_models/env-specific';
//import { Router, ActivatedRoute } from '@angular/router';

@Component({
    //moduleId: module.id,
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    firstLink: string;

    constructor(envSpecificSvc: EnvironmentSpecificService) {
        envSpecificSvc.subscribe(this, this.setLink);
    }
    title = 'appasdfas';

    setLink(caller: any, es: EnvSpecific) {
        const thisCaller = caller as AppComponent;
        thisCaller.firstLink = es.apiUrl;
    }
}
