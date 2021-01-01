import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SeamstressOnCallTestModule } from '../../../test.module';
import { SeamstressUpdateComponent } from 'app/entities/seamstress/seamstress-update.component';
import { SeamstressService } from 'app/entities/seamstress/seamstress.service';
import { Seamstress } from 'app/shared/model/seamstress.model';

describe('Component Tests', () => {
  describe('Seamstress Management Update Component', () => {
    let comp: SeamstressUpdateComponent;
    let fixture: ComponentFixture<SeamstressUpdateComponent>;
    let service: SeamstressService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SeamstressOnCallTestModule],
        declarations: [SeamstressUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SeamstressUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SeamstressUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SeamstressService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Seamstress(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Seamstress();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
