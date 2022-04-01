import { Component, OnInit } from '@angular/core';
import { faEdit,faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  faEdit = faEdit;
  faCircleXmark = faCircleXmark;

  // form: FormGroup = this.fb.group({
  //   firstName: ['', Validators.required],
  //   lastName: ['', Validators.required],
  //   email: ['', [Validators.required, Validators.email, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
  //   password: ['', [Validators.required, Validators.minLength(6)]],
  //   confirm password: ['', [Validators.required, Validators.minLength(6)]]
  // })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
