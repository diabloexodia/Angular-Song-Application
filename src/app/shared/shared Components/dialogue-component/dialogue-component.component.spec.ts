import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueComponentComponent } from './dialogue-component.component';

describe('DialogueComponentComponent', () => {
  let component: DialogueComponentComponent;
  let fixture: ComponentFixture<DialogueComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogueComponentComponent]
    });
    fixture = TestBed.createComponent(DialogueComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
