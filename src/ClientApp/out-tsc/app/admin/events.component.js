"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var collections_1 = require("@angular/cdk/collections");
var material_1 = require("@angular/material");
var voidwell_api_service_1 = require("../shared/services/voidwell-api.service");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/finally");
require("rxjs/add/observable/throw");
var EventsComponent = (function () {
    function EventsComponent(api, dialog) {
        var _this = this;
        this.api = api;
        this.dialog = dialog;
        this.isLoading = true;
        this.errorMessage = null;
        this.isLoading = true;
        this.getEventsRequest = this.api.getCustomEvents()
            .subscribe(function (events) {
            _this.dataSource = new TableDataSource(events);
            _this.isLoading = false;
        });
    }
    EventsComponent.prototype.onEdit = function (event) {
        var dialogRef = this.dialog.open(EventEditorDialog, {
            data: { event: event }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            //this.animal = result;
        });
    };
    EventsComponent.prototype.ngOnDestroy = function () {
        if (this.getEventsRequest) {
            this.getEventsRequest.unsubscribe();
        }
    };
    return EventsComponent;
}());
EventsComponent = __decorate([
    core_1.Component({
        selector: 'voidwell-admin-events',
        templateUrl: './events.template.html'
    }),
    __metadata("design:paramtypes", [voidwell_api_service_1.VoidwellApi, material_1.MatDialog])
], EventsComponent);
exports.EventsComponent = EventsComponent;
var TableDataSource = (function (_super) {
    __extends(TableDataSource, _super);
    function TableDataSource(data) {
        var _this = _super.call(this) || this;
        _this.data = data;
        return _this;
    }
    TableDataSource.prototype.connect = function () {
        var _this = this;
        var first = Observable_1.Observable.of(this.data);
        return Observable_1.Observable.merge(first).map(function () {
            var data = _this.data.slice();
            return data;
        });
    };
    TableDataSource.prototype.disconnect = function () { };
    return TableDataSource;
}(collections_1.DataSource));
exports.TableDataSource = TableDataSource;
var EventEditorDialog = (function () {
    function EventEditorDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.servers = [
            { id: "1", name: "Connery" },
            { id: "10", name: "Miller" },
            { id: "13", name: "Cobalt" },
            { id: "17", name: "Emerald" },
            { id: "19", name: "Jaeger" },
            { id: "25", name: "Briggs" }
        ];
        this.maps = [
            { id: "2", name: "Indar" },
            { id: "4", name: "Hossin" },
            { id: "6", name: "Amerish" },
            { id: "8", name: "Esamir" }
        ];
    }
    EventEditorDialog.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    return EventEditorDialog;
}());
EventEditorDialog = __decorate([
    core_1.Component({
        selector: 'event-editor-dialog',
        templateUrl: 'event-editor-dialog.html',
    }),
    __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [material_1.MatDialogRef, Object])
], EventEditorDialog);
exports.EventEditorDialog = EventEditorDialog;
