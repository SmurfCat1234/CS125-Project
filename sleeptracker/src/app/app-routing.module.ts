import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'log-sleep-time',
    loadChildren: () => import('./log-sleep-time/log-sleep-time.module').then( m => m.LogSleepTimePageModule)
  },
  {
    path: 'log-sleepiness',
    loadChildren: () => import('./log-sleepiness/log-sleepiness.module').then( m => m.LogSleepinessPageModule)
  },
  {
    path: 'show-logged-overnight-sleep',
    loadChildren: () => import('./show-logged-overnight-sleep/show-logged-overnight-sleep.module').then( m => m.ShowLoggedOvernightSleepPageModule)
  },
  {
    path: 'show-logged-sleepiness-levels',
    loadChildren: () => import('./show-logged-sleepiness-levels/show-logged-sleepiness-levels.module').then( m => m.ShowLoggedSleepinessLevelsPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'view',
    loadChildren: () => import('./view/view.module').then( m => m.ViewPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'recommendations',
    loadChildren: () => import('./recommend/recommend.module').then( m => m.RecommendationsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
