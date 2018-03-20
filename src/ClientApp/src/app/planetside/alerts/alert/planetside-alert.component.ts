﻿import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from '../../../shared/services/header.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { PlanetsideApi } from './../../planetside-api.service';
import { PlanetsideCombatEventComponent } from './../../combat-event/planetside-combat-event.component';

@Component({
    templateUrl: './planetside-alert.template.html',
    styleUrls: ['./planetside-alert.styles.css'],
    providers: [PlanetsideCombatEventComponent]
})

export class PlanetsideAlertComponent extends PlanetsideCombatEventComponent implements OnDestroy {
    isLoading: boolean = true;
    errorMessage: string = null;

    private sub: any;
    private navLinks = [
        { path: 'players', display: 'Players' },
        { path: 'outfits', display: 'Outfits' },
        { path: 'weapons', display: 'Weapons' },
        { path: 'vehicles', display: 'Vehicles' },
        { path: 'map', display: 'Map' }
    ];

    constructor(private api: PlanetsideApi, private route: ActivatedRoute, private headerService: HeaderService) {
        super(headerService);

        this.sub = this.route.params.subscribe(params => {
            let worldId = params['worldId'];
            let instanceId = params['instanceId'];

            this.isLoading = true;
            this.errorMessage = null;
            this.activeEvent = null;

            this.event.next(null);

            this.api.getAlert(worldId, instanceId)
                .catch(error => {
                    this.errorMessage = error._body
                    this.isLoading = false;
                    return Observable.throw(error);
                })
                .subscribe(data => this.setup(data));
        });
    }

    private setup(data: any) {
        this.setupHeader(data.metagameEvent.name, data.metagameEvent.description, data.zoneId);

        this.event.next(data);
        this.activeEvent = data;
        this.isLoading = false;
    }

    private getEndDate(alert: any): Date {
        let startString = alert.startDate;
        let startMs = new Date(startString).getTime();
        return new Date(startMs + 1000 * 60 * 45);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
        super.ngOnDestroy();
    }
}