import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteComponentComponent } from './delete-component.component';

describe('DeleteComponentComponent', () => {
  let component: DeleteComponentComponent;
  let fixture: ComponentFixture<DeleteComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteComponentComponent]
    });
    fixture = TestBed.createComponent(DeleteComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
