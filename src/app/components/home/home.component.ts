import {
  Component,
  computed,
  Renderer2,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { UpworkService } from '../../core/services/upwork.service';
import { TextPipe } from '../../core/pipes/text.pipe';
import { TimePipe } from '../../core/pipes/time.pipe';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Dialog, DialogModule } from 'primeng/dialog';
import { SanatizerPipe } from '../../core/pipes/sanatizer.pipe';
import { ToastService } from '../../core/services/toast.service';
import { ButtonModule } from 'primeng/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomSidenavComponent } from '../custom-sidenav/custom-sidenav.component';
import { StepperModule } from 'primeng/stepper';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    InputTextModule,
    CommonModule,
    TextPipe,
    TimePipe,
    SpinnerComponent,
    DialogModule,
    SanatizerPipe,
    ButtonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    CustomSidenavComponent,
    StepperModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  collapsed = signal(false);
  sideNavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));
  jobsData: any[] = [];
  postsSubscription!: Subscription;
  visiblemodal: boolean = false;
  busName = localStorage.getItem('BusniessName');
  spinner: boolean = false;
  loading: boolean = false;
  visible: boolean = false;
  proposal!: string;
  jobIndex!: number;
  constructor(
    private UpworkService: UpworkService,
    private Renderer2: Renderer2,
    private ToastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getFilterdPosts();
  }
  getFilterdPosts() {
    this.spinner = true;
    this.postsSubscription = this.UpworkService.getFilterdJobs().subscribe({
      next: (res) => {
        this.spinner = false;
        console.log(res, '🫡🫡🫡🫡🫡🫡');
        this.jobsData = res.data.data.marketplaceJobPostings.edges;
        this.jobsData.sort(
          (a, b) =>
            new Date(b.node.createdDateTime).getTime() -
            new Date(a.node.createdDateTime).getTime()
        );
        console.log(this.jobsData, '🍰🍰🍰🍰🍰');
      },
      error: (err: HttpErrorResponse) => {
        this.spinner = true;
        console.log(err);
        this.ToastService.showError(err.error.message);
      },
    });
  }
  getPrposla(
    offer: string,
    edge: any,
    element: HTMLButtonElement,
    index: number
  ) {
    this.Renderer2.setAttribute(element, 'disabled', 'true');
    edge.loading = true;
    this.UpworkService.getProposal(offer).subscribe({
      next: (res) => {
        edge.loading = false;
        console.log(res.data);
        console.log(typeof res.data);
        this.proposal = res.data;
        this.visible = true;
        this.Renderer2.removeAttribute(element, 'disabled');
        this.jobIndex = index;
      },
      error: (err: HttpErrorResponse) => {
        edge.loading = false;
        console.log(err);
      },
    });
  }
  openUpword(url: string) {
    window.open(url);
  }
  openJob() {
    let url = this.jobsData[this.jobIndex].node.url;
    window.open(url);
    console.log(url, '🐧🐧🐧🐧🐧🐧🐧');
  }

  showDialog() {
    this.visiblemodal = true;
  }

  ngOnDestroy(): void {
    if (this.postsSubscription && this.postsSubscription.closed) {
      this.postsSubscription.unsubscribe();
    }
  }
}
