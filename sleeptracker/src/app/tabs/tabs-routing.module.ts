import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'view',
        loadChildren: () => import('../view/view.module').then(m => m.ViewPageModule) // Make sure this is set up
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsPageModule) // Make sure this is set up
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      },
      
      {
        path: 'search',
        loadChildren: () => import('../search/search.module').then(m => m.SearchPageModule)
      },
      {
        path: 'recommend',
        loadChildren: () => import('../recommend/recommend.module').then(m => m.RecommendationsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      },


      {
        path: 'log-sleep-time',
        loadChildren: () => import('../log-sleep-time/log-sleep-time.module').then(m => m.LogSleepTimePageModule)
      },
      {
        path: 'log-sleepiness',
        loadChildren: () => import('../log-sleepiness/log-sleepiness.module').then(m => m.LogSleepinessPageModule)
      },
      {
        path: 'show-logged-overnight-sleep',
        loadChildren: () => import('../show-logged-overnight-sleep/show-logged-overnight-sleep.module').then(m => m.ShowLoggedOvernightSleepPageModule)
      },
      {
        path: 'show-logged-sleepiness-levels',
        loadChildren: () => import('../show-logged-sleepiness-levels/show-logged-sleepiness-levels.module').then(m => m.ShowLoggedSleepinessLevelsPageModule)
      },
    
    ]

    
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
