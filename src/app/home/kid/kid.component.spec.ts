import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { KidService } from 'app/shared/services/kid.service';
import { ReactiveFormsModule } from '@angular/forms';
import { KidComponent } from './kid.component';
import { NavigationService } from 'app/core/services/navigation.service';
import { MatSnackBar } from '@angular/material';
import { of } from 'rxjs';
import { MaterialModule } from 'app/material/material.module';
import { KendoModule } from 'app/kendo/kendo.module';
import { ContractType, PaymentMethod, Kid } from 'app/shared/models/kid.model';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('KidComponent', () => {
  let originalTimeout: number;
  let component: KidComponent;
  let fixture: ComponentFixture<KidComponent>;
  let debugElement: DebugElement;
  let kidService: KidService;
  let getKidByIdSpy: any;

  const mockKid: Kid = <Kid>{
    address: 'Via roma 20',
    birthdate: new Date(1992, 10, 26),
    cap: 38010,
    city: 'Trento',
    contractType: ContractType.Contratto,
    contractValue: 420,
    firstName: 'Foo',
    lastName: 'Bar',
    fiscalCode: 'FOOBAR92R26L378N',
    id: '23',
    from: new Date(),
    notes: 'some random notes here...',
    province: 'TN',
    subscription: 200,
    subscriptionPaid: false,
    parentFirstName: 'BAZ',
    parentLastName: 'FIZ',
    parentFiscalCode: 'FIZBAZ68R25L378R',
    paymentMethod: PaymentMethod.Bonifico,
    presencesList: null,
    to: null
  } as Kid;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MaterialModule,
        KendoModule,
        HttpClientTestingModule
      ],
      declarations: [KidComponent],
      providers: [
        KidService,
        {
          provide: ActivatedRoute, useValue: { params: of({ id: 123 }) },
        },
        { provide: NavigationService, useValue: {} },
        { provide: MatSnackBar, useValue: {} }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    fixture = TestBed.createComponent(KidComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    kidService = debugElement.injector.get(KidService);
    getKidByIdSpy = spyOn(kidService, 'getKidById').and.returnValue(of(mockKid));
    fixture.detectChanges();
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate form', () => {
    const form = component.editForm;
    expect(form).toBeTruthy();
  });

  it('should have contract type list ', () => {
    const contractTypes = component.contractTypeList;
    expect(contractTypes).toBeDefined();
  });

  it('should have payment method list ', () => {
    const paymentMethods = component.paymentMethodList;
    expect(paymentMethods).toBeDefined();
  });

  it('should have contract type list with 2 entries', () => {
    const contractTypesLength = component.contractTypeList.length;
    expect(contractTypesLength).toBe(2);
  });

  it('should have payment method list with 2 entries', () => {
    const paymentMethodsList = component.paymentMethodList.length;
    expect(paymentMethodsList).toBe(2);
  });

  it('should have "contract" and "hours" contract types and correct text values', () => {
    const contractTypes = component.contractTypeList;
    const contract = contractTypes.find(ct => ct.value === ContractType.Contratto);
    expect(contract).toBeTruthy();
    expect(contract.text).toBe('Contratto');

    const hours = contractTypes.find(ct => ct.value === ContractType.Ore);
    expect(hours).toBeTruthy();
    expect(hours.text).toBe('Ore');
  });

  it('should have "bonifico" and "contanti" payment types and correct text values', () => {
    const paymentMethods = component.paymentMethodList;
    const bonifico = paymentMethods.find(pm => pm.value === PaymentMethod.Bonifico);
    expect(bonifico).toBeTruthy();
    expect(bonifico.text).toBe('Bonifico');

    const contanti = paymentMethods.find(pm => pm.value === PaymentMethod.Contanti);
    expect(contanti).toBeTruthy();
    expect(contanti.text).toBe('Contanti');
  });

  it('should populate form with correct data', async () => {
    await fixture.whenRenderingDone();

    const firstName = component.editForm.get('firstName').value;
    expect(firstName).toBe(mockKid.firstName);
    const lastName = component.editForm.get('lastName').value;
    expect(lastName).toBe(mockKid.lastName);
    const birthdate: Date = component.editForm.get('birthdate').value;
    expect(birthdate.getTime()).toBe(mockKid.birthdate.getTime());
    const from: Date = component.editForm.get('from').value;
    if (from) {
      expect(from.getTime()).toBe(mockKid.from.getTime());
    }
    const to: Date = component.editForm.get('to').value;
    if (to) {
      expect(to.getTime()).toBe(mockKid.to.getTime());
    }
    const address = component.editForm.get('address').value;
    expect(address).toBe(mockKid.address);
    const cap = component.editForm.get('cap').value;
    expect(cap).toBe(mockKid.cap);
    const city = component.editForm.get('city').value;
    expect(city).toBe(mockKid.city);
    const contractType = component.editForm.get('contractType').value;
    expect(contractType).toBe(mockKid.contractType);
    const fiscalCode = component.editForm.get('fiscalCode').value;
    expect(fiscalCode).toBe(mockKid.fiscalCode);
    const notes = component.editForm.get('notes').value;
    expect(notes).toBe(mockKid.notes);
    const province = component.editForm.get('province').value;
    expect(province).toBe(mockKid.province);
    const subscription = component.editForm.get('subscription').value;
    expect(subscription).toBe(mockKid.subscription);
    const parentFirstName = component.editForm.get('parentFirstName').value;
    expect(parentFirstName).toBe(mockKid.parentFirstName);
    const parentLastName = component.editForm.get('parentLastName').value;
    expect(parentLastName).toBe(mockKid.parentLastName);
    const parentFiscalCode = component.editForm.get('parentFiscalCode').value;
    expect(parentFiscalCode).toBe(mockKid.parentFiscalCode);
    const paymentMethod = component.editForm.get('paymentMethod').value;
    expect(paymentMethod).toBe(mockKid.paymentMethod);
  });

});
