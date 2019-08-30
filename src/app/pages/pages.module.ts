import { NgModule } from '@angular/core';

//RUTAS
import { PAGES_ROUTES } from './pages.routes';

//MODULOS
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

//TEMPORAL
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';

// PIPES MODULE
import { PipesModule } from '../pipes/pipes.module';


//COMPONENTES
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ChartsModule } from 'ng2-charts';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';




@NgModule({
    declarations:[
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        ChartsModule
    ],
    imports: [
        CommonModule,
        PAGES_ROUTES,
        SharedModule,
        FormsModule,
        ChartsModule,
        PipesModule
    ]
})
export class PagesModule{}