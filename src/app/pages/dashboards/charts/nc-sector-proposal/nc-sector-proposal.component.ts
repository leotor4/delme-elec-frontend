import { Component, Input, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { NonCompliance } from "src/app/models/non-compliance";
import { ProposalSolution } from "src/app/models/proposal-solution";
import { ChartsService } from "src/app/_services/charts.service";

@Component({
  selector: "app-nc-sector-proposal",
  templateUrl: "./nc-sector-proposal.component.html",
  styleUrls: ["./nc-sector-proposal.component.css"],
})
export class NcSectorProposalComponent implements OnInit {
  @Input() size: number[] = [];
  constructor(
    public chartsService: ChartsService,
    public translate: TranslateService
  ) {}
  setor = this.translate.instant("global.all");

  graph: any;

  setoresAux: string[] = [];
  ngOnInit(): void {
    this.popularSetores();
    this.popular();
  }

  popular() {
    let setores: string[] = [];
    let respostaPrazo: number[] = [];
    let semRespostaPrazo: number[] = [];
    let sempRespostaAtrasado: number[] = [];
    let respostaAtrasado: number[] = [];
    this.setoresAux.forEach((element) => {
      if (
        (this.setor == "Todos" || this.setor == element) &&
        element != "Todos"
      ) {
        setores.push(element);
        respostaPrazo.push(0);
        semRespostaPrazo.push(0);
        sempRespostaAtrasado.push(0);
        respostaAtrasado.push(0);
      }
    });

    this.chartsService.ncs.forEach((element) => {
      if (element.proposalSolution && element.tipos_local_item) {
        let setorAfetado = element.tipos_local_item;
        let proposta = element.proposalSolution;
        let index = setores.indexOf(setorAfetado);
        if (this.isComplete(proposta) && !this.isLate(element)) {
          respostaPrazo[index]++;
        }
        if (this.isComplete(proposta) && this.isLate(element)) {
          respostaAtrasado[index]++;
        }
        if (!this.isComplete(proposta) && !this.isLate(element)) {
          semRespostaPrazo[index]++;
        }
        if (!this.isComplete(proposta) && this.isLate(element)) {
          sempRespostaAtrasado[index]++;
        }
      }
    });

    this.graph = {
      data: [
        {
          x: setores,
          y: respostaPrazo,
          text: respostaPrazo.map(String),
          textposition: "auto",
          type: "bar",
          name: "Respondida – no prazo",
          marker: { color: "rgb(29,104,251)" },
        },
        {
          x: setores,
          y: respostaAtrasado,
          text: respostaAtrasado.map(String),
          textposition: "auto",
          type: "bar",
          name: "Respondida – atrasada",
          marker: { color: "rgb(51,192,252)" },
        },
        {
          x: setores,
          y: semRespostaPrazo,
          text: semRespostaPrazo.map(String),
          textposition: "auto",
          type: "bar",
          name: "Sem resposta – no prazo",
          marker: { color: "rgb(74,255,254)" },
        },
        {
          x: setores,
          y: sempRespostaAtrasado,
          text: sempRespostaAtrasado.map(String),
          textposition: "auto",
          type: "bar",
          name: "Sem resposta – atrasada",
          marker: { color: "rgb(175,255,255)" },
        },
      ],
      layout: {
        width: this.size[0],
        height: this.size[1],
        xaxis: { title: "" },
        yaxis: { title: "" },
        autosize: true,
        title: "",
      },
      config: { responsive: true },
    };
  }

  isComplete(proposal: ProposalSolution): boolean {
    if (proposal.status == "complete") return true;
    return false;
  }

  isLate(nc: NonCompliance): boolean {
    let dataAbertura = new Date(nc.data_abertura!);
    let now = new Date()
    let daysDiff = now.getDate() - dataAbertura.getDate();
    if(daysDiff >= 14) return true
    return false
  }

  popularSetores() {
    this.setoresAux = Object.assign([], this.chartsService.sectors);
    this.setoresAux.unshift("Todos");
    this.setoresAux.push(this.translate.instant("global.all"));
    this.setor = this.translate.instant("global.all");
  }
}
