import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-css',
  template: `
  <h3>ngCss</h3>
  <p>
      css works!!
    </p>
  `,
  styles: [`p {
    color:red;
    font-size: 20px;
  }`]
})
export class CssComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
