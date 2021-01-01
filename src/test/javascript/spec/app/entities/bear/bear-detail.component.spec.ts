import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SeamstressOnCallTestModule } from '../../../test.module';
import { BearDetailComponent } from 'app/entities/bear/bear-detail.component';
import { Bear } from 'app/shared/model/bear.model';

describe('Component Tests', () => {
  describe('Bear Management Detail Component', () => {
    let comp: BearDetailComponent;
    let fixture: ComponentFixture<BearDetailComponent>;
    const route = ({ data: of({ bear: new Bear(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SeamstressOnCallTestModule],
        declarations: [BearDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(BearDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BearDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load bear on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.bear).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
