import { Component } from '@angular/core';

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrl: './angular.component.css'
})
export class AngularComponent {
  //
  pages = [
    {
      'url': '/FeaturePages',
      'text': '[ANGULAR - CARACTERISTICAS]',
    },
    {
      'url': '/Curriculum',
      'text': '[ANGULAR - CURRICULUM]',
    },
    {
      'url': '/DevPages',
      'text': '[ANGULAR - ENTORNOS]',
    },
  ]
  constructor(){
    //
  }
}