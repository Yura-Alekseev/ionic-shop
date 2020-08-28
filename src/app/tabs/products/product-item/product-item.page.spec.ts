import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductItemPage } from './product-item.page';

describe('ProductItemPage', () => {
  let component: ProductItemPage;
  let fixture: ComponentFixture<ProductItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
