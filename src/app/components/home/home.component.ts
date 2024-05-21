import { Component, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { UpworkService } from '../../core/services/upwork.service';
import { TextPipe } from '../../core/pipes/text.pipe';
import { TimePipe } from '../../core/pipes/time.pipe';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    InputTextModule,
    CommonModule,
    TextPipe,
    TimePipe,
    SpinnerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  jobsData: any[] = [];
  postsSubscription!: Subscription;
  spinner: boolean = false;
  loading: boolean = false;
  constructor(private UpworkService: UpworkService) {}

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
        console.log(this.jobsData, '🍰🍰🍰🍰🍰');
      },
      error: (err: HttpErrorResponse) => {
        this.spinner = true;
        console.log(err);
      },
    });
  }
  getPrposla(offer: string) {
    this.loading = true;
    this.UpworkService.getProposal(offer).subscribe({
      next: (res) => {
        this.loading = false;
        console.log(res.data);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.postsSubscription && this.postsSubscription.closed) {
      this.postsSubscription.unsubscribe();
    }
  }
}
