import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';



@Injectable({
  providedIn: 'root'
})
export class DashboardsService {

  constructor() { }


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
}
