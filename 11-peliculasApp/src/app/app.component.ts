import { Component } from '@angular/core';
import { filter, pairwise } from 'rxjs/operators';
import { Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'peliculasapp';

  urlAnterior: string;

  constructor(private router: Router) {
    this.router.events
            .pipe(filter((e: any) => e instanceof RoutesRecognized),
                pairwise()
            ).subscribe((e: any) => {
                // console.log(e[0].urlAfterRedirects); // previous url
                this.urlAnterior = e[0].urlAfterRedirects;
            });
  }
}
