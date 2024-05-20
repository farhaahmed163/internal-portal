import { Component, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { UpworkService } from '../../core/services/upwork.service';
import { TextPipe } from '../../core/pipes/text.pipe';
import { TimePipe } from '../../core/pipes/time.pipe';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InputTextModule, CommonModule, TextPipe, TimePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  jobsData: any[] = [];
  postsSubscription!: Subscription;
  constructor(private UpworkService: UpworkService) {}

  ngOnInit(): void {
    this.getFilterdPosts();
  }
  getFilterdPosts() {
    this.postsSubscription = this.UpworkService.getFilterdJobs().subscribe({
      next: (res) => {
        console.log(res, '🫡🫡🫡🫡🫡🫡');
        this.jobsData = res.data.data.marketplaceJobPostings.edges;
        console.log(this.jobsData, '🍰🍰🍰🍰🍰');
      },
    });
  }

  ngOnDestroy(): void {
    if (this.postsSubscription && this.postsSubscription.closed) {
      this.postsSubscription.unsubscribe();
    }
  }
}
