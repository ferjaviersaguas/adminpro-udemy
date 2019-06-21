import { NgModule } from '@angular/core';

//RUTAS
import { PAGES_ROUTES } from './pages.routes';

//MODULOS
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

//TEMPORAL
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';

//COMPONENTES
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';


@NgModule({
    declarations:[
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        ChartsModule
    ],
    imports: [
        PAGES_ROUTES,
        SharedModule,
        FormsModule,
        ChartsModule
    ]
})
export class PagesModule{}