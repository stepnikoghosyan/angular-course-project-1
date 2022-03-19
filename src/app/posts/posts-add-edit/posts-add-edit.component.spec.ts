import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsAddEditComponent } from './posts-add-edit.component';

describe('PostsAddEditComponent', () => {
  let component: PostsAddEditComponent;
  let fixture: ComponentFixture<PostsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
