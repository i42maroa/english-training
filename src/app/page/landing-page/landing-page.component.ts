import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  form!:FormGroup;

  constructor(
    private readonly formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
  }

}
