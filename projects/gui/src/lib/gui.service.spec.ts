import { TestBed } from '@angular/core/testing';

import { GuiService } from './gui.service';

describe('GuiService', () => {
  let service: GuiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
