import { TestBed, inject } from '@angular/core/testing';

import { ChooseService } from './choose.service';

describe('ChooseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChooseService]
    });
  });

  it('should ...', inject([ChooseService], (service: ChooseService) => {
    expect(service).toBeTruthy();
  }));
});
