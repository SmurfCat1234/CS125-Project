// src/app/recommend/recommend.page.ts
import { Component, OnInit } from '@angular/core';
import { RecommendationService } from '../services/recommendation.service';

interface Recommendation {
  title: string;
  content: string;
}

@Component({
  selector: 'app-recommend',
  templateUrl: 'recommend.page.html',
  styleUrls: ['recommend.page.scss'],
})
export class RecommendationsPage implements OnInit {
  recommendations: Recommendation[] = [];

  constructor(private recommendationService: RecommendationService) {}

  async ngOnInit() {
    this.recommendations = await this.recommendationService.getRecommendations();
  }
}
