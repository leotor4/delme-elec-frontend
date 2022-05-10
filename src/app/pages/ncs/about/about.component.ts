import { Component, OnInit } from '@angular/core';
import { NonCompliance } from 'src/app/models/non-compliance';
import { NonComplianceService } from 'src/app/_services/non-compliance.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {


  id: any
  nc: NonCompliance

  constructor(private ncsService : NonComplianceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    
    
    this.ncsService.getById(this.id).subscribe((data: any) => {
      this.nc = data.nc 
    })
  }

}
