
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
import { NavComponent                           } from './_modules/home/nav/nav.component';
import { PageNotFoundComponent                  } from './_modules/home/page-not-found/page-not-found.component';
import { HomeComponent                          } from './_modules/home/home/home.component';
import { CurriculumComponent                    } from './_modules/curriculum/curriculum.component';
import { ConfigService                          } from './_services/config.service';
import { NgbdSortableHeader                     } from './_services/sortable.directive';
import { NgtablesampleComponent                 } from './_modules/pages/ngtablesample/ngtablesample.component';
import { DemoService                            } from './_services/demo.service';
//
export function initialize(_configService: ConfigService) {
  // 
  return () => _configService.loadConfig();
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PageNotFoundComponent,
    HomeComponent,
    CurriculumComponent,
    NgtablesampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule,
    NgbHighlight, 
    NgbdSortableHeader, 
    NgbPaginationModule,
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
    [DemoService,DatePipe,DecimalPipe,HttpClient],
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
