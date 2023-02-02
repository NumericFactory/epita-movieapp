import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  constructor(private route:ActivatedRoute) {}

  ngOnInit() {

    console.log( this.route.snapshot.params) // {id: 123456}
    

  }

}
