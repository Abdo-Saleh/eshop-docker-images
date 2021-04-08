
import { StorageService } from './StorageService';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegisterComponent } from './register/register.component';

import { MaterialModule } from './material/material.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CardComponent } from './card/card.component';
import { FooterComponent } from './footer/footer.component';
import { ProductContentComponent } from './product-content/product-content.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PayingMethodsComponent } from './paying-methods/paying-methods.component';
import { DeliveryInfoComponent } from './delivery-info/delivery-info.component';

import { HttpClientModule } from '@angular/common/http';
import { OrderCompletedComponent } from './order-completed/order-completed.component';

import { AuthGuard } from './services/auth/auth-guard';
import { ShopAssistentGuard } from './services/auth/shop-assistent-guard'
import { AdminGuard } from './services/auth/admin-guard'
import { AuthService } from './services/auth/auth-service';
import { ManageBoardComponent } from './manage-board/manage-board.component';
import { ResendPasswordComponent } from './resend-password/resend-password.component';
import { AdminComponent } from './admin/admin.component';

import * as Raven from 'raven-js';
import { SuccessMessageComponent } from './info-snackbars/success-message/success-message.component';
import { ErrorMessageComponent } from './info-snackbars/error-message/error-message.component';

Raven.config('https://712f212178c64dd8bb90e045eeb51f98@o517887.ingest.sentry.io/5694911').install();
/*
import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn: "https://712f212178c64dd8bb90e045eeb51f98@o517887.ingest.sentry.io/5694911",

  // Alternatively, use `process.env.npm_package_version` for a dynamic release version
  // if your build tool supports it.
  release: "my-project-name@2.3.12",
  integrations: [new Integrations.BrowserTracing()],
  s
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

});
*/
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    RegisterComponent,
    CardComponent,
    FooterComponent,
    ProductContentComponent,
    ShoppingCartComponent,
    PayingMethodsComponent,
    DeliveryInfoComponent,
    OrderCompletedComponent,
    ManageBoardComponent,
    ResendPasswordComponent,
    AdminComponent,
    SuccessMessageComponent,
    ErrorMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatMenuModule,
    MatToolbarModule,
    FlexLayoutModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AuthGuard, AuthService,StorageService, AdminGuard, ShopAssistentGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
