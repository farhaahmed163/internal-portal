import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  Input,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { StepperModule } from 'primeng/stepper';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChipsModule } from 'primeng/chips';

import { RadioButtonModule } from 'primeng/radiobutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsService } from '../../core/services/forms.service';
import { Subcategory } from '../../core/interface/subcategory';
import { MessagesModule } from 'primeng/messages';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    StepperModule,
    ToggleButtonModule,
    CommonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    PasswordModule,
    FormsModule,
    ChipsModule,
    ReactiveFormsModule,
    RadioButtonModule,
    MultiSelectModule,
    InputNumberModule,
    InputSwitchModule,
    MessagesModule,
  ],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CustomSidenavComponent {
  upworkAuthSubscription!: Subscription;
  isSubmitted: boolean = false;
  sucessMessageFirst: string = '';
  sucessMessageSec: string = '';
  sucessMessageThi: string = '';
  sucessFirst: boolean = false;
  sucessSec: boolean = false;
  sucessThi: boolean = false;
  busName = localStorage.getItem('BusniessName');
  firstForm: FormGroup = new FormGroup({
    searchExpression: new FormControl('', [Validators.required]),
    titleExpression: new FormControl('', [Validators.required]),
    orTerms: new FormControl([], [Validators.required]),
    exactTerms_any: new FormControl('', [Validators.required]),
    andTerms_all: new FormControl([], [Validators.required]),
    excludeTerms: new FormControl([], [Validators.required]),
    categories: new FormControl([], [Validators.required]),
    subCategories: new FormControl([], [Validators.required]),
    jobType: new FormControl(''),
    clientHiresRangeStart: new FormControl(''),
    clientHiresRangeEnd: new FormControl(''),
    budgetRangeStart: new FormControl(''),
    budgetRangeEnd: new FormControl(''),
    verifiedPaymentOnly: new FormControl<boolean>(false),
    sortField: new FormControl(''),
    daysPosted: new FormControl(''),
  });
  secondForm: FormGroup = new FormGroup({
    experienceLevel: new FormControl('', [Validators.required]),
    skills: new FormControl('', [Validators.required]),
    priceRate: new FormControl('', [Validators.required]),
  });
  thirdForm: FormGroup = new FormGroup({
    client_id: new FormControl('', [Validators.required]),
    client_secret: new FormControl('', [Validators.required]),
  });
  cat!: any[];
  experienceLevel!: any[];
  selectedCategories: any[] = [];
  selectedSubcategories!: any[];
  groupedCategories: any[] = [];
  subCategories: any;
  projType: any[] = ['FIXED PRICE', 'HOURLY'];
  sortField: any[] = ['RECENCY', 'RELEVANCE', 'CLIENT_RATING'];

  ngOnInit(): void {
    this.cat = [
      { name: 'Accounting & Consulting' },
      { name: 'Admin Support' },
      { name: 'Customer Service' },
      { name: 'Data Science & Analytics' },
      { name: 'Design & Creative' },
      { name: 'Graphic, Editorial & Presentation Design' },
      { name: 'Engineering & Architecture' },
      { name: 'IT & Networking' },
      { name: 'Legal' },
      { name: 'Sales & Marketing' },
      { name: 'Translation' },
      { name: 'Web, Mobile & Software Dev' },
      { name: 'Writing' },
    ];
    this.experienceLevel = [
      { name: 'less than 1 Year' },
      { name: '1-2' },
      { name: '2-5' },
      { name: 'More Than 5' },
    ];
  }
  constructor(
    private FormsService: FormsService,
    private AuthService: AuthService,
    private Router: Router
  ) {}
  onCategorySelect() {
    console.log(this.selectedCategories, '👏👏👏👏');
    const selectedNames = this.selectedCategories.map(
      (category) => category.name
    );
    if (selectedNames.length > 0) {
      this.FormsService.subCategory(selectedNames).subscribe({
        next: (res) => {
          console.log(res);
          this.subCategories = res.data;
          this.transformResponseToGroupedCategories(res.data);
          console.log(
            'Transformed Grouped Categories:',
            this.groupedCategories
          );
          console.log(this.subCategories, '🦆🦆🦆🦆🦆');
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  transformResponseToGroupedCategories(data: {
    [category: string]: Subcategory[];
  }) {
    this.groupedCategories = Object.keys(data).map((category) => {
      return {
        label: category,
        value: category,
        items: data[category].map((sub) => ({
          label: sub.preferredLabel,
          value: sub.id,
        })),
      };
    });
  }
  active: number = 0;
  maxRate: number = 100;
  minRate: number = 0;

  // ---------------
  minBudget: number = 10;
  maxBudget: number = 1000000;

  // ---------------------
  priceRate: number = 0;
  daysPosted: number = 0;
  checked: boolean = false;
  name: string = '';

  email: string = '';

  password: string = '';

  sideNavCollapsed = signal(false);

  profilePicSize = computed(() => (this.sideNavCollapsed() ? '50' : '100'));
  headinSize = computed(() => (this.sideNavCollapsed() ? '' : ''));

  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
  firstFormSubmit() {
    const formValue = this.firstForm.value;

    formValue.exactTerms_any = [formValue.exactTerms_any];
    formValue.categories = formValue.categories.map(
      (category: any) => category.name
    );
    this.isSubmitted = true;
    this.FormsService.submitDynamicQuery(formValue).subscribe({
      next: (res) => {
        this.isSubmitted = false;
        this.sucessFirst = true;
        console.log(res, '🥹🥹🥹🥹🥹🥹');
        this.sucessMessageFirst = res.message;
      },
      error: (err) => {
        console.log(err);
        this.isSubmitted = false;
      },
    });
  }
  submitSecondForm() {
    this.isSubmitted = true;
    const secFormValue = this.secondForm.value;
    secFormValue.experienceLevel = secFormValue.experienceLevel.name;
    console.log(this.secondForm.value);
    this.FormsService.submitDynamicAi(secFormValue).subscribe({
      next: (res) => {
        this.isSubmitted = false;
        this.sucessSec = true;
        console.log(res);
        this.sucessMessageSec = res.message;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  submitThirdForm() {
    this.isSubmitted = true;
    const formValue = this.thirdForm.value;
    console.log(this.thirdForm.value);
    this.FormsService.updateBusinessUpwork(formValue).subscribe({
      next: (res) => {
        this.isSubmitted = false;
        this.sucessThi = true;
        this.sucessMessageThi = res.message;
        console.log(res);
        this.upworkAuth();
      },
    });
  }

  upworkAuth() {
    console.log('gowa el function');
    this.AuthService.getAuthRequest().subscribe({
      next: (res) => {
        console.log(res, '🐧🐧🐧🐧');
        this.Router.navigate([res.data]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
