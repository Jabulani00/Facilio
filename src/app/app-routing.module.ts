import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'login-registration',
    loadChildren: () => import('./login-registration/login-registration.module').then(m => m.LoginRegistrationPageModule)
  },
  {
    path: 'dashboard-bm',
    loadChildren: () => import('./dashboard-bm/dashboard-bm.module').then(m => m.DashboardBmPageModule)
  },
  {
    path: 'dashboard-sp',
    loadChildren: () => import('./dashboard-sp/dashboard-sp.module').then(m => m.DashboardSpPageModule)
  },
  {
    path: 'maintenance-requests-bm',
    loadChildren: () => import('./maintenance-requests-bm/maintenance-requests-bm.module').then(m => m.MaintenanceRequestsBmPageModule)
  },
  {
    path: 'maintenance-requests-sp',
    loadChildren: () => import('./maintenance-requests-sp/maintenance-requests-sp.module').then(m => m.MaintenanceRequestsSpPageModule)
  },
  {
    path: 'service-details',
    loadChildren: () => import('./service-details/service-details.module').then(m => m.ServiceDetailsPageModule)
  },
  {
    path: 'rating-and-review',
    loadChildren: () => import('./rating-and-review/rating-and-review.module').then(m => m.RatingAndReviewPageModule)
  },
  {
    path: 'admin-panel',
    loadChildren: () => import('./admin-panel/admin-panel.module').then(m => m.AdminPanelPageModule)
  },
  {
    path: 'report-issue-bm',
    loadChildren: () => import('./report-issue-bm/report-issue-bm.module').then(m => m.ReportIssueBmPageModule)
  },
  {
    path: 'report-issue-sp',
    loadChildren: () => import('./report-issue-sp/report-issue-sp.module').then(m => m.ReportIssueSpPageModule)
  },
  {
    path: 'task-status-update',
    loadChildren: () => import('./task-status-update/task-status-update.module').then(m => m.TaskStatusUpdatePageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfilePageModule)
  },
  {
    path: 'search-results',
    loadChildren: () => import('./search-results/search-results.module').then(m => m.SearchResultsPageModule)
  },
  {
    path: 'messaging',
    loadChildren: () => import('./messaging/messaging.module').then(m => m.MessagingPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomePageModule)
  },
 
  {
    path: 'bm-dash',
    loadChildren: () => import('./bm-dash/bm-dash.module').then( m => m.BmDashPageModule)
  },
  {
    path: 'sp-dash',
    loadChildren: () => import('./sp-dash/sp-dash.module').then( m => m.SpDashPageModule)
  },
  {
    path: 'admin-dash',
    loadChildren: () => import('./admin-dash/admin-dash.module').then( m => m.AdminDashPageModule)
  },
  
  {
    path: 'admin-stats',
    loadChildren: () => import('./admin-stats/admin-stats.module').then( m => m.AdminStatsPageModule)
  },
  
  
  {
    path: 'service-request-modal',
    loadChildren: () => import('./service-request-modal/service-request-modal.module').then( m => m.ServiceRequestModalPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then( m => m.ReportsPageModule)
  },
  {
    path: '**',
    redirectTo: 'login-registration'
  },
  

 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }