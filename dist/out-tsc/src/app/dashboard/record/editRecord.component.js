var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ClientApi } from '../../shared/sdk/services/custom/Client';
import { RecordApi } from '../../shared/sdk/services/custom/Record';
import { Record } from '../../shared/sdk/models/Record';
import { Router, ActivatedRoute } from '@angular/router';
var EditRecordComponent = (function () {
    function EditRecordComponent(clientApi, recordApi, route, router) {
        this.clientApi = clientApi;
        this.recordApi = recordApi;
        this.route = route;
        this.router = router;
        this.changed = false;
        this.showSubmit = false;
        this.editorContent = "<p>My HTML</p>";
        this.editorConfig = {
            placeholder: "输入公告内容，支持html"
        };
        this.Bike_options = [{ label: 'Select Options', value: null },
            { label: 'Bike_Strong', value: "Bike_Strong" },
            { label: 'Bike_Moderate', value: "Bike_Moderate" },
            { label: 'Bike_Weak', value: "Bike_Weak" },];
        this.Trunk_Lean_Evenly_options = [{ label: 'Select Options', value: null },
            { label: 'Evenly', value: "Evenly" },
            { label: 'Left_Predorminantly', value: "Left_Predorminantly" },
            { label: 'Right_Predominantly', value: "Right_Predominantly" },];
        this.Leg_coordinated_options = [{ label: 'Select Options', value: null },
            { label: 'Coordinated', value: "Coordinated" },
            { label: 'Most_Of_The_Time', value: "Most_Of_The_Time" },
            { label: 'Not_Coordinated', value: "Not_Coordinated" },];
        this.record = new Record();
        this.record.remarks = "";
        this.getRecord();
    }
    EditRecordComponent.prototype.getRecord = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            _this.recordId = params['id'];
            _this.recordApi.findById(_this.recordId, {})
                .subscribe(function (_record) {
                console.log(_record);
                _this.record = _record;
                if (!_this.record.remarks)
                    _this.editorContent = "";
                else
                    _this.editorContent = _this.record.remarks;
                _this.changed = false;
            }, function (err) { console.log(err); });
        });
    };
    EditRecordComponent.prototype.onEditorCreated = function (quill) {
        var _this = this;
        this.qillObj = quill;
        setTimeout(function () { _this.changed = false; }, 100);
        console.log('this is quill object', quill);
    };
    EditRecordComponent.prototype.onContentChanged = function (_a) {
        var quill = _a.quill, html = _a.html, text = _a.text;
        console.log(quill, html, text);
        if (this.editorContent != this.record.remarks)
            this.changed = true;
    };
    EditRecordComponent.prototype.submitChanges = function () {
        var _this = this;
        this.record.remarks = this.editorContent;
        delete this.record.data;
        this.recordApi.updateAttributes(this.record.id, this.record)
            .subscribe(function (res) {
            console.log(res);
            _this.changed = false;
            _this.getRecord();
        }, function (err) { console.log(err); });
    };
    EditRecordComponent.prototype.onLabelChanges = function (e) {
        this.record.labeledDate = "" + new Date().getTime();
        this.changed = true;
    };
    return EditRecordComponent;
}());
EditRecordComponent = __decorate([
    Component({
        selector: 'record-edit-component',
        templateUrl: './Edit.Record.component.html',
        styleUrls: ['./Edit.Record.component.scss']
    }),
    __metadata("design:paramtypes", [ClientApi,
        RecordApi,
        ActivatedRoute,
        Router])
], EditRecordComponent);
export { EditRecordComponent };
//# sourceMappingURL=../../../../../../src/app/dashboard/record/editRecord.component.js.map