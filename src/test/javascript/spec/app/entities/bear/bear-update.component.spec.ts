import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SeamstressOnCallTestModule } from '../../../test.module';
import { BearUpdateComponent } from 'app/entities/bear/bear-update.component';
import { BearService } from 'app/entities/bear/bear.service';
import { Bear } from 'app/shared/model/bear.model';

describe('Component Tests', () => {
  describe('Bear Management Update Component', () => {
    let comp: BearUpdateComponent;
    let fixture: ComponentFixture<BearUpdateComponent>;
    let service: BearService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SeamstressOnCallTestModule],
        declarations: [BearUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(BearUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BearUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BearService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Bear(123);
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
        const entity = new Bear();
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
