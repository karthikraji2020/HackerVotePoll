import { TestBed } from '@angular/core/testing';

import { HackerService } from './hacker.service';

describe('HackerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HackerService = TestBed.get(HackerService);
    expect(service).toBeTruthy();
  });
});
