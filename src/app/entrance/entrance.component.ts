import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrance',
  standalone: true,
  imports: [],
  templateUrl: './entrance.component.html',
  styleUrl: './entrance.component.scss'
})
export class EntranceComponent {

constructor( private router: Router,) { }

  goToReport() {
    this.router.navigate(['/report']);
  }

}
