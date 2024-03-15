import { Component, OnInit } from '@angular/core';
import { RecommendationService } from '../services/recommendation.service';

interface Recommendation {
  title: string;
  content: string;
  // Include other fields as needed
}

@Component({
  selector: 'app-recommend',
  templateUrl: 'recommend.page.html',
  styleUrls: ['recommend.page.scss'],
})
export class RecommendationsPage implements OnInit {
  recommendations: Recommendation[] = []; // Use the Recommendation interface

  constructor(private recommendationService: RecommendationService) {}

  ngOnInit() {
    this.recommendationService.getRecommendations().subscribe(recommendations => {
      this.recommendations = recommendations;
    });
  }
}
