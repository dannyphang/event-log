import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceptionDialogComponent } from './exception-dialog.component';

describe('ExceptionDialogComponent', () => {
  let component: ExceptionDialogComponent;
  let fixture: ComponentFixture<ExceptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExceptionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExceptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
