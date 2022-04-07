import { Component, OnInit } from '@angular/core';
import { NcsService } from '../ncs.service';


@Component({
  selector: 'app-ncs-list',
  templateUrl: './ncs-list.component.html',
  styleUrls: ['./ncs-list.component.css']
})
export class NcsListComponent implements OnInit {

  constructor(private ncsService : NcsService) { }

  ngOnInit(): void {

    this.ncsService.getNcs().subscribe({
      next: data => {
        //TODO
      }

    });
  }

}
