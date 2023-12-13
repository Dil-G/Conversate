import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { HeaderComponent } from './components/header/header.component';
import {MatIconModule} from '@angular/material/icon';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SubNavBarComponent } from './components/sub-nav-bar/sub-nav-bar.component';
import { TeamsGeneralComponent } from './components/teams-general/teams-general.component';
import { ChannelHeaderComponent } from './components/teams-general/channel-header/channel-header.component';
import { ChannelContentComponent } from './components/teams-general/channel-content/channel-content.component';
import { HttpClientModule } from '@angular/common/http';
import { AddPostComponent } from './components/teams-general/channel-content/add-post/add-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { EditPostComponent } from './components/teams-general/channel-content/edit-post/edit-post.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavBarComponent,
    SubNavBarComponent,
    TeamsGeneralComponent,
    ChannelHeaderComponent,
    ChannelContentComponent,
    AddPostComponent,
    EditPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
