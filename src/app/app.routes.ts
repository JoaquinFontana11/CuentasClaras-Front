import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SectionLoginComponent } from './section-login/section-login.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { PaymentsComponent } from './payments/payments.component';
import { GroupNewComponent } from './group-new/group-new.component';
import { GroupInvitationsComponent } from './group-invitations/group-invitations.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: SectionLoginComponent },
  { path: 'grupos', component: GroupsComponent },
  { path: 'grupos/detalle/:id', component: GroupDetailComponent },
  { path: 'pagos', component: PaymentsComponent },
  { path: 'grupos/nuevo', component: GroupNewComponent },
  { path: 'grupos/invitaciones', component: GroupInvitationsComponent },
];
