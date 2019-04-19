import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
clickMessage = '';
books:Object;
 values = 'web api';
  onKey(value: string) {
    this.values += value + ' | ';
	
  }
  
constructor(private data: DataService) { }

  ngOnInit() {

}
}

