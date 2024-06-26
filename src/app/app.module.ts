
import { AppRoutingModule                         } from './app-routing.module';
import { AppComponent                             } from './app.component';
import { APP_INITIALIZER, NgModule                } from '@angular/core';
import { AsyncPipe, DatePipe, DecimalPipe         } from '@angular/common';
import { FormsModule                              } from '@angular/forms';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { HttpClientModule                       } from '@angular/common/http';
import { BrowserModule, provideClientHydration  } from '@angular/platform-browser';
import { NgbHighlight, NgbModule                } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule    } from '@ng-bootstrap/ng-bootstrap';
import { DemosComponent                         } from './_modules/_home/demos/demos.component';
import { MarketingComponent                     } from './_modules/_home/marketing/marketing.component';
import { HomeComponent                          } from './_modules/_home/home/home.component';
import { NavComponent                           } from './_modules/_home/nav/nav.component';
import { PageNotFoundComponent                  } from './_modules/_home/page-not-found/page-not-found.component';
import { DevPageSortableHeader                  } from './_directives/devPagesListSortable.directive';
import { CurriculumSortableHeader               } from './_directives/curriculumSortable.directive';
import { FeaturePageSortableHeader              } from './_directives/featurePageListSortable.directive';
import { NodeJsDirective                        } from './_directives/node-js.directive';
import { MarketingSortableHeader                } from './_directives/marketing.directive';
import { devPagesListService                    } from './_services/devPagesList.service';
import { ConfigService                          } from './_services/config.service';
import { CppWebComponent                        } from './_modules/_demos/CppDemo/cpp-web/cpp-web.component';
import { NetcoreWebComponent                    } from './_modules/_demos/NetCore/netcore-web/netcore-web.component';
import { NodeJsWebComponent                     } from './_modules/_demos/Nodejs/node-js-web/node-js-web.component';
import { PhpWebComponent                        } from './_modules/_demos/Php/php-web/php-web.component';
import { AngularComponent                       } from './_modules/_demos/angular/angular-web/angular.component';
import { DevPagesListsComponent                 } from './_modules/_demos/angular/devPages/devPagesList.component';
import { FeaturePagesComponent                  } from './_modules/_demos/angular/feature-pages/feature-pages.component';
import { CurriculumComponent                    } from './_modules/_education/_Angular/curriculum.component';
import { EduWebComponent                        } from './_modules/_education/edu-web/edu-web.component';
//
export function initialize(_configService: ConfigService, http: HttpClient) {
  //
  _configService.loadFeaturesData();
  //
  _configService.loadDevPages();
  //
  _configService.loadCurriculumData();
  //
  _configService.loadMarketing();
  // 
  return () =>  _configService.loadConfig();
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PageNotFoundComponent,
    HomeComponent,
    CurriculumComponent,
    DevPagesListsComponent,
    FeaturePagesComponent,
    AngularComponent,
    NetcoreWebComponent,
    PhpWebComponent,
    NodeJsWebComponent,
    NodeJsDirective,
    MarketingComponent,
    MarketingSortableHeader,
    DemosComponent,
    CppWebComponent,
    EduWebComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule,
    NgbHighlight, 
    NgbPaginationModule,
    DevPageSortableHeader,
    CurriculumSortableHeader,
    FeaturePageSortableHeader,
    DecimalPipe, 
    FormsModule, 
    AsyncPipe, 
  ],
  providers: [
    [
      provideHttpClient(withFetch()),
      ConfigService,
      {
        provide   : APP_INITIALIZER,
        useFactory: initialize,
        deps      : [ConfigService,HttpClient],
        multi     : true
      },
    ],
    [devPagesListService,DatePipe,DecimalPipe,HttpClient],
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
