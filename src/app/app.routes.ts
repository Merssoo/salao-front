import { Routes } from '@angular/router';
import { AgendamentosComponent } from './features/agendamentos/agendamentos.component';
import { LojaComponent } from './features/loja/loja.component';
import { AdminComponent } from './features/admin/admin.component';
import { InicioComponent } from './features/inicio/inicio.component';
import { ServicosComponent } from './features/servicos/servicos.component';
import { StudioComponent } from './features/studio/studio.component';
import { FeedbackComponent } from './features/feedback/feedback.component';


export const routes: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'studio', component: StudioComponent },
    { path: 'servicos', component: ServicosComponent },
    { path: 'loja', component: LojaComponent },
    { path: 'agendamentos', component: AgendamentosComponent },
    { path: 'feddback', component: FeedbackComponent },
    { path: 'admin', component: AdminComponent },
    { path: '', redirectTo: 'inicio', pathMatch: 'full' }
];
