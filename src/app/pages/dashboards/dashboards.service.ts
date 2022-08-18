import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { NonCompliance } from 'src/app/models/non-compliance';
import { environment } from 'src/environments/environment';
import {TranslateService} from "@ngx-translate/core";



@Injectable({
  providedIn: 'root'
})
export class DashboardsService {
  

  constructor(private http: HttpClient
              , public translate: TranslateService) { }


  getGroupedBarChartStatusSetor(val: string) :Observable<Array<any>> {
    var barDataTest: Array<any> = []
    
    switch (val) {
      case '0':
        barDataTest = [
          {
            "name" : "LABORATÓRIO",
            "series" : [
              {
                "name" : "Cancelada",
                "value" : 2
              },
              {
                "name" : "Em execução",
                "value" : 3
              },
              {
                "name" : "Executada",
                "value" : 40
              }
            ]
          },


          {
            "name" : "PCP",
            "series" : [
              {
                "name" : "Cancelada",
                "value" : 2
              },
              {
                "name" : "Em execução",
                "value" : 2
              },
              {
                "name" : "Executada",
                "value" : 4
              }
            ]
          },

          {
            "name" : "COMPRAS",
            "series" : [
              {
                "name" : "Cancelada",
                "value" : 0
              },
              {
                "name" : "Em execução",
                "value" : 7
              },
              {
                "name" : "Executada",
                "value" : 13
              }
            ]
          },


          {
            "name" : "SEGURANÇA DO TRABALHO",
            "series" : [
              {
                "name" : "Cancelada",
                "value" : 0
              },
              {
                "name" : "Em execução",
                "value" : 2
              },
              {
                "name" : "Executada",
                "value" : 3
              }
            ]
          },


          {
            "name" : "COMERCIAL",
            "series" : [
              {
                "name" : "Cancelada",
                "value" : 1
              },
              {
                "name" : "Em execução",
                "value" : 1
              },
              {
                "name" : "Executada",
                "value" : 2
              }
            ]
          },


          {
            "name" : "SGQ",
            "series" : [
              {
                "name" : "Cancelada",
                "value" : 0
              },
              {
                "name" : "Em execução",
                "value" : 0
              },
              {
                "name" : "Executada",
                "value" : 2
              }
            ]
          },

        ]
        break;









        case '1':
        barDataTest = [
          {
            "name" : "LABORATÓRIO",
            "series" : [
              {
                "name" : "Cancelada",
                "value" : 2
              }
            ]
          },


          {
            "name" : "PCP",
            "series" : [
              {
                "name" : "Cancelada",
                "value" : 2
              }
            ]
          },


          {
            "name" : "COMERCIAL",
            "series" : [
              {
                "name" : "Cancelada",
                "value" : 1
              }
            ]
          }
        ]
        break;







        case '2':
          barDataTest = [
            {
              "name" : "LABORATÓRIO",
              "series" : [
                {
                  "name" : "Em execução",
                  "value" : 3
                }
              ]
            },
  
  
            {
              "name" : "PCP",
              "series" : [
                
                {
                  "name" : "Em execução",
                  "value" : 2
                }
              ]
            },
  
            {
              "name" : "COMPRAS",
              "series" : [
                
                {
                  "name" : "Em execução",
                  "value" : 7
                }
              ]
            },
  
  
            {
              "name" : "SEGURANÇA DO TRABALHO",
              "series" : [
                
                {
                  "name" : "Em execução",
                  "value" : 2
                }
              ]
            },
  
  
            {
              "name" : "COMERCIAL",
              "series" : [
                
                {
                  "name" : "Em execução",
                  "value" : 1
                }
              ]
            }
  
          ]
          break;





          case '3':
            barDataTest = [
              {
                "name" : "LABORATÓRIO",
                "series" : [
                  
                  {
                    "name" : "Executada",
                    "value" : 40
                  }
                ]
              },
    
    
              {
                "name" : "PCP",
                "series" : [
                  
                  {
                    "name" : "Executada",
                    "value" : 4
                  }
                ]
              },
    
              {
                "name" : "COMPRAS",
                "series" : [
                 
                  {
                    "name" : "Executada",
                    "value" : 13
                  }
                ]
              },
    
    
              {
                "name" : "SEGURANÇA DO TRABALHO",
                "series" : [
                  
                  {
                    "name" : "Executada",
                    "value" : 3
                  }
                ]
              },
    
    
              {
                "name" : "COMERCIAL",
                "series" : [
                  
                  {
                    "name" : "Executada",
                    "value" : 2
                  }
                ]
              },
    
    
              {
                "name" : "SGQ",
                "series" : [
                  
                  {
                    "name" : "Executada",
                    "value" : 2
                  }
                ]
              },
    
            ]
            break;
    }

    return of (barDataTest)
  }

  getBarChartStatus(val: string) : Observable<Array<any>> {
    var barDataTest: Array<any> = []

    switch (val) {
      case '0':
        barDataTest = [
          {
            "name": "Cancelada",
            "value": 5 ,      
          },
          {
            "name": "Em execução",
            "value": 15 ,
            
          },
          {
            "name": "Executada",
            "value": 64 ,
            
          }
        ];
        break;

        case '1':
          barDataTest = [
            {
              "name": "Cancelada",
              "value": 2,      
            },
            {
              "name": "Em execução",
              "value": 3,
              
            },
            {
              "name": "Executada",
              "value": 40,
              
            }
          ];
          break;

          case '2':
          barDataTest = [
            {
              "name": "Cancelada",
              "value": 2,      
            },
            {
              "name": "Em execução",
              "value": 2,
              
            },
            {
              "name": "Executada",
              "value": 4,
              
            }
          ];
          break;


          case '3':
            barDataTest = [
              {
                "name": "Cancelada",
                "value": 0,      
              },
              {
                "name": "Em execução",
                "value": 7,
                
              },
              {
                "name": "Executada",
                "value": 13,
                
              }
            ];
            break;

            case '4':
              barDataTest = [
                {
                  "name": "Cancelada",
                  "value": 1,      
                },
                {
                  "name": "Em execução",
                  "value": 2,
                  
                },
                {
                  "name": "Executada",
                  "value": 3,
                  
                }
              ];
              break;

              case '5':
                barDataTest = [
                  {
                    "name": "Cancelada",
                    "value": 1,      
                  },
                  {
                    "name": "Em execução",
                    "value": 1,
                    
                  },
                  {
                    "name": "Executada",
                    "value": 2,
                    
                  }
                ];
                break;

                case '6':
                  barDataTest = [
                    {
                      "name": "Cancelada",
                      "value": 0,      
                    },
                    {
                      "name": "Em execução",
                      "value": 0,
                      
                    },
                    {
                      "name": "Executada",
                      "value": 2,
                      
                    }
                  ];
                  break;

    }
    

    return of (barDataTest);
  }

  getKpisList(compliances: NonCompliance[]) {
    var kpiData: any[] = []

    var currentYear = new Date().getFullYear()
    var totalNcsYear = 0
    var totalNcsRunning = 0
    var totalNcsCanceled = 0
    var totalNcsLate = 0
    var totalNcsClosed = 0 

    for (let i = 0; i < compliances.length; i++) {
      var nc = compliances[i];
     

      if (nc.code?.split('/')[1] == currentYear.toString()) {
        totalNcsYear = totalNcsYear + 1

        if(nc.status?.toLowerCase() == 'running') {
          totalNcsRunning = totalNcsRunning + 1
        }

        if(nc.status?.toLowerCase() == 'canceled') {
          totalNcsCanceled = totalNcsCanceled + 1
        }

        if(nc.status?.toLowerCase() == 'late') {
          totalNcsLate = totalNcsLate + 1
        }

        if(nc.status?.toLowerCase() == 'closed') {
          totalNcsClosed = totalNcsClosed + 1;
        }
      }
    } 



    kpiData.push({
      "name" : this.translate.instant("global.NCsTotal"),
      "value": totalNcsYear
    })

    kpiData.push({
      "name" : this.translate.instant("global.ncStatus1"),
      "value": totalNcsClosed
    })

    kpiData.push({
      "name" : this.translate.instant("global.status2"),
      "value": totalNcsRunning
    })

    kpiData.push({
      "name" : this.translate.instant("global.ncStatus3"),
      "value": totalNcsCanceled
    })

    kpiData.push({
      "name" : this.translate.instant("global.ncStatus4"),
      "value": totalNcsLate
    })


    return of(kpiData)

  }


  getPiesValues(compliances: NonCompliance[], filterStatus : string) {
    var pieData: any[] = []
    

    
    var totalNcsCanceled = 0
    var totalNcsLate = 0
    var totalNcsOpened = 0
    var totalNcsClosed = 0;
 
    for (let i = 0; i < compliances.length; i++) {
      var nc = compliances[i];



        if(nc.status?.toLowerCase() == 'canceled') {
          totalNcsCanceled = totalNcsCanceled + 1
        }

        if(nc.status?.toLowerCase() == 'late') {
          totalNcsLate = totalNcsLate + 1
        }

        if(nc.status?.toLowerCase() == 'running') {
          totalNcsOpened = totalNcsOpened + 1
        }

        if (nc.status?.toLowerCase() == "closed") {
          totalNcsClosed = totalNcsClosed + 1;
        }
      
    } 


   


    if (filterStatus == 'all' || filterStatus == 'canceled') {
      pieData.push({
        "name" : this.translate.instant("global.canceled"),
        "value": totalNcsCanceled
      })
    }      


    
    if (filterStatus == 'all' || filterStatus == 'late') {
      pieData.push({
        "name" : this.translate.instant("global.late"),
        "value": totalNcsLate
      })  
    }
    


    if (
      filterStatus == "all" ||
      filterStatus == "open" ||
      filterStatus == "running"
    ) {
      pieData.push({
        name: this.translate.instant("global.status2"),
        value: totalNcsOpened,
      });
    }

    if (filterStatus == "all" || filterStatus == "close") {
      pieData.push({
        name: this.translate.instant("global.status7"),
        value: totalNcsClosed,
      });
    }


    return of(pieData)

  }



  getTimeLineValues():Observable<any>  {
    return this.http.get(environment.apiURL + 'dashboards/ncsByStatusAndMonths')
  }
  
}
