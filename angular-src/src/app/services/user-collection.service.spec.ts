/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserCollectionService } from './user-collection.service';

describe('UserCollectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserCollectionService]
    });
  });

  it('should ...', inject([UserCollectionService], (service: UserCollectionService) => {
    expect(service).toBeTruthy();
  }));
});
