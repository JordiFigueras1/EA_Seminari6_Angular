import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscadorExperienciasComponent } from './buscador.component';

describe('BuscadorExperienciasComponent', () => {
  let component: BuscadorExperienciasComponent;
  let fixture: ComponentFixture<BuscadorExperienciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscadorExperienciasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscadorExperienciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
