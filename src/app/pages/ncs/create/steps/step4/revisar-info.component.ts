import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {Attachment} from "src/app/models/attachment";
import {NonComplianceService} from "../../../../../_services/non-compliance.service";

@Component({
    selector: "app-step4",
    templateUrl: "./revisar-info.component.html",
    styleUrls: ["./revisar-info.component.css"],
})
export class RevisarInfoComponent implements OnInit {
    isAllOpen = true;
    unselectedClass = "btn unselected-btn";
    selectedClass = "btn selected-btn";
    @Output() changeStepPosition: EventEmitter<number> = new EventEmitter();

    constructor(
        public nonComplicanceService: NonComplianceService,
        public translate: TranslateService
    ) {
    }

    goToStepById(position: number) {
        this.changeStepPosition.emit(position);
    }

    ngOnInit(): void {
    }

    emissor = "";

    returnTitle(): string {
        if (this.nonComplicanceService.nc.tipos_parceiro_item == "Interno")
            return "Dados do Setor";
        return "Razão Social";
    }

    returnFile(name: string) {
        let acoesFile: Attachment[] = [];
        this.nonComplicanceService.nc.attachments.forEach((element) => {
            if (element.path == name) {
                acoesFile.push(element);
            }
        });
        return acoesFile;
    }

    returnRadioValue(): string {
        switch (this.nonComplicanceService.nc.radio_value) {
            case "val1":
                return this.translate.instant("newNC.step2.radioLabel1");
            case "val2":
                return this.translate.instant("newNC.step2.radioLabel2");
            case "val3":
                return this.translate.instant("newNC.step2.radioLabel3");
            case "val4":
                return this.translate.instant("newNC.step2.radioLabel4");
            default:
                return "";
        }
    }
}
