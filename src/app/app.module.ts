import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//RUTAS
import { APP_ROUTES } from './app.routes';

//MODULOS
import { PagesModule } from './pages/pages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


//COMPONENTES
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

//SERVICIOS
import { ServicesModule } from './services/services.module';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    // PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
