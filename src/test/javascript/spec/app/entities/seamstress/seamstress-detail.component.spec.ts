import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SeamstressOnCallTestModule } from '../../../test.module';
import { SeamstressDetailComponent } from 'app/entities/seamstress/seamstress-detail.component';
import { Seamstress } from 'app/shared/model/seamstress.model';

describe('Component Tests', () => {
  describe('Seamstress Management Detail Component', () => {
    let comp: SeamstressDetailComponent;
    let fixture: ComponentFixture<SeamstressDetailComponent>;
    const route = ({ data: of({ seamstress: new Seamstress(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SeamstressOnCallTestModule],
        declarations: [SeamstressDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SeamstressDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SeamstressDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load seamstress on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.seamstress).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
