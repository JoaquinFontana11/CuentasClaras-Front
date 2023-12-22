import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SectionLoginComponent } from './section-login/section-login.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { PaymentsComponent } from './payments/payments.component';
import { GroupNewComponent } from './group-new/group-new.component';
import { GroupInvitationsComponent } from './group-invitations/group-invitations.component';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { SectionRegisterComponent } from './section-register/section-register.component';
import { logged } from './guards/logged';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: SectionLoginComponent },
  { path: 'grupos/editar/:id', component: GroupEditComponent, }
  { path: 'grupos', component: GroupsComponent ,canActivate:[logged]},
  { path: 'grupos/detalle/:id', component: GroupDetailComponent,canActivate:[logged] },
  { path: 'pagos', component: PaymentsComponent,canActivate:[logged] },
  { path: 'grupos/nuevo', component: GroupNewComponent ,canActivate:[logged]},
  { path: 'grupos/invitaciones', component: GroupInvitationsComponent,canActivate:[logged] },
  { path:  'register', component:SectionRegisterComponent}
];
