import {Component, OnInit} from '@angular/core';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ClosingService} from "../../ncs/about/closing/closing.service";
import {MessageService} from "primeng/api";
import {ProposalService} from "../../ncs/create-prop/proposal.service";
import {DateUtils} from "../../../utils/date-utils";
import {VisualizarDocumentoDialogComponent} from "../visualizar-documento-dialog/visualizar-documento-dialog.component";
import {TranslateService} from "@ngx-translate/core";
import {Attachment} from "../../../models/attachment";
import {NonCompliance} from "../../../models/non-compliance";

@Component({
    selector: 'app-dados-nc',
    templateUrl: './dados-nc.component.html',
    styleUrls: ['./dados-nc.component.css'],
    providers: [
        DialogService
    ]
})
export class DadosNCComponent implements OnInit {
    isAllOpen = true;
    unselectedClass = "btn unselected-btn";
    selectedClass = "btn selected-btn";
    nc: NonCompliance;

    constructor(public ref: DynamicDialogRef,
                public cServ: ClosingService,
                public config: DynamicDialogConfig,
                private messageService: MessageService,
                public propSrvc: ProposalService,
                public translate: TranslateService) {
    }

    ngOnInit(): void {
        this.nc = this.config.data.nc
        console.log(this.nc)
    }

    formato_brasileiro(data: Date | undefined | null): string {
        const dataFormatada = data ? DateUtils.formato_brasileiro(data) : '00/00/0000';
        return dataFormatada
    }

    isType1(element: any) {
        return element.path == "evidenciasNc";
    }

    isType2(element: any) {
        return element.path == "evidenciasAcoes";
    }

    getPercent() {
        return Math.round(
            (this.nc?.quant_nc * 100) / this.nc?.quant_total
        );
    }

    returnFile(name: string) {
        let acoesFile: Attachment[] = [];
        this.nc.attachments?.forEach((element) => {
            if (element.path == name) {
                acoesFile.push(element);
            }
        });
        return acoesFile;
    }

    returnTitle(): string {
        if (this.nc.tipos_parceiro_item == "Interno")
            return this.translate.instant("newNC.review.sector");
        return this.translate.instant("newNC.review.corporateName");
    }

    returnNumber(): string {
        let text = "";

        if (this.nc.tipo_controle) {
            if (this.nc.tipo_controle.includes("OP")) {
                text = this.nc.num_op!;
            } else {
                text = this.nc.num_nota!;
            }
        }

        return text;
    }

    haveSegment(): boolean {
        return !!this.nc.tipos_auditoria_item;
    }

    returnRadioValue(): string {
        switch (this.nc.radio_value) {
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
