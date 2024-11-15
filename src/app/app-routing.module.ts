import { NgModule                  } from '@angular/core';
import { RouterModule, Routes      } from '@angular/router';
import { CurriculumComponent       } from './_modules/_education/AngularDemo/curriculum.component';
import { EduWebComponent           } from './_modules/_education/_edu-web/edu-web.component';
import { MarketingComponent        } from './_modules/_marketing/marketing.component';
import { AngularComponent          } from './_modules/_demos/angularDemo/angular-web/angular.component';
import { FeaturePagesComponent     } from './_modules/_demos/angularDemo/feature-pages/feature-pages.component';
import { CppDemoComponent          } from './_modules/_demos/CppDemo/cpp-demo/cpp-demo.component';
import { CppWebComponent           } from './_modules/_demos/CppDemo/cpp-web/cpp-web.component';
import { NetcoreWebComponent       } from './_modules/_demos/NetCore/netcore-web/netcoreweb/netcore-web.component';
import { NetcoredemoComponent      } from './_modules/_demos/NetCore/netcore-web/netcoredemo/netcoredemo.component';
import { NodejsDemoComponent       } from './_modules/_demos/Nodejs/nodejs-demo/nodejs-demo.component';
import { NodeJsWebComponent        } from './_modules/_demos/Nodejs/node-js-web/node-js-web.component';
import { DemosComponent            } from './_modules/_demos/_demosweb/demos.component';
import { SpringBootWebComponent    } from './_modules/_demos/SpringBoot/SpringBootWeb/spring-boot-web/spring-boot-web.component';
import { SpringBootDemoComponent   } from './_modules/_demos/SpringBoot/SpringBootDemo/spring-boot-demo/spring-boot-demo.component';
import { SpringBootConfigComponent } from './_modules/_config/spring-boot-config/spring-boot-config.component';
import { DevPagesListsComponent    } from './_modules/_config/AngularConfig/devPagesList.component';
import { ConfigWebComponent        } from './_modules/_config/_config-web/config-web.component';
import { NodeJsConfigComponent     } from './_modules/_config/node-js-config/node-js-config.component';
import { NetCoreConfigComponent    } from './_modules/_config/net-core-config/net-core-config.component';
import { CanActivateGuard          } from './_modules/_config/can-activate.guard';
import { ContactComponent          } from './_modules/_about/contact/contact.component';
import { TechInfoComponent         } from './_modules/_about/tech-info/tech-info.component';
import { AboutWebComponent         } from './_modules/_about/about-web/about-web.component';
import { AiPromtsComponent         } from './_modules/_about/ai-promts/ai-promts.component';
import { ProtectedComponent        } from './_modules/_login/protected/protected.component';
import { PageNotFoundComponent     } from './_modules/_home/page-not-found/page-not-found.component';
import { HomeComponent             } from './_modules/_home/_homeWeb/home.component';


//
const routes: Routes = [
  {  path: 'Home'                     , component: HomeComponent                      },
  {  path: ''                         , component: HomeComponent                      },
  {  path: 'AngularWeb'               , component: AngularComponent                   }, 
  {  path: 'AngularFeaturesPages'     , component: FeaturePagesComponent              },
  {  path: 'AngularReference'         , component: CurriculumComponent               
                                      , canActivate: [CanActivateGuard]               }, // Protected component
  {  path: 'AngularConfig'            , component: DevPagesListsComponent             },
  {  path: 'NodeJsWeb'                , component: NodeJsWebComponent                 }, 
  {  path: 'NodeJsDemo'               , component: NodejsDemoComponent                }, 
  {  path: 'NodeJsWeb'                , component: NodeJsWebComponent                 }, 
  {  path: 'NodeJsConfig'             , component: NodeJsConfigComponent              }, 
  {  path: 'NetCoreConfig'            , component: NetCoreConfigComponent             },
  {  path: 'NetCoreDemo'              , component: NetcoredemoComponent               },
  {  path: 'NetCoreWeb'               , component: NetcoreWebComponent                },
  {  path: 'CppDemo'                  , component: CppDemoComponent                   }, 
  {  path: 'CppWeb'                   , component: CppWebComponent                    }, 
  {  path: 'DemosWeb'                 , component: DemosComponent                     }, 
  {  path: 'SpringBootWeb'            , component: SpringBootWebComponent             }, 
  {  path: 'SpringBootDemo'           , component: SpringBootDemoComponent            }, 
  {  path: 'SpringBootConfig'         , component: SpringBootConfigComponent          }, 
  {  path: 'EduWeb'                   , component: EduWebComponent                    },
  {  path: 'ConfigWeb'                , component: ConfigWebComponent                 
                                      , canActivate: [CanActivateGuard]               }, // Protected component
  {  path: 'Contact'                  , component: ContactComponent                   },
  {  path: 'TechInfo'                 , component: TechInfoComponent                  },
  {  path: 'AiPrompts'                , component: AiPromtsComponent                  },
  {  path: 'AboutWeb'                 , component: AboutWebComponent                  },
  {  path: 'Marketing'                , component: MarketingComponent                 
                                      , canActivate: [CanActivateGuard]               }, // Protected component
  {  path: 'protected'                , component: ProtectedComponent                 },
  {  path: '**'                       , component: PageNotFoundComponent              },
];

//
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

//
export class AppRoutingModule { }
