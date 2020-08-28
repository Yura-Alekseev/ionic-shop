import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FavoriteItemPage } from './favorite-item.page';

describe('FavoriteItemPage', () => {
  let component: FavoriteItemPage;
  let fixture: ComponentFixture<FavoriteItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
