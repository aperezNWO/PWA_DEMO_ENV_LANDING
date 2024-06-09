import { Component, OnInit, VERSION } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfigService } from '../../../_services/config.service';
//
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
//
export class NavComponent {

  // propiedades publicas
  public readonly _appBrand: string | undefined = "";
  public readonly _title: string | undefined = "";
  public readonly _appEnv: string | undefined = "";
  public readonly _appVersion: string | undefined = "";
  //
  public _navbarCollapsed: boolean = true;
  //
  public get _NavbarCollapsed(): boolean {
    //
    return this._navbarCollapsed;
  }
  //
  public set _NavbarCollapsed(p_navbarCollapsed: boolean) {
    //
    this._navbarCollapsed = p_navbarCollapsed;
  }
  //
  pages = [
    {
      'url': '/Home',
      'text': '[HOME]',
    },
    {
      'url': '/Pages',
      'text': '[PAGES]',
    },
    {
      'url': '/Curriculum',
      'text': '[CURRICULUM]',
    },
    {
      'url': '/NgSampleTable',
      'text': '[NG TABLE SAMPLE]',
    },
  ]
  //-----------------------------------------------------------------------------------------------------
  constructor(
    private _configService: ConfigService,
    private titleService: Title
  ) {
    //
    console.log("Loading AppComponent...");
    // IMPLEMENT AS MAP AND ITERATE
    let keyName: string = '';
    let keyValue: string = '';
    //
    keyName = 'appBrand';
    keyValue = this._configService.getConfigValue(keyName);
    this._appBrand = keyValue;
    //
    keyName = 'appEnv';
    keyValue = this._configService.getConfigValue(keyName);
    this._appEnv = keyValue;
    //
    keyName = 'appVersion';
    keyValue = this._configService.getConfigValue(keyName);
    this._appVersion = keyValue;
    //
    let title: string = `${this._appBrand} -- ${this._appEnv} -- ${this._appVersion}`;
    //
    this.titleService.setTitle(title);
    //
    console.log("Setting Title : " + title);
  }
  //-----------------------------------------------------------------------------------------------------
  ngOnInit() {
    //
  }
  //
  getValueFromConfig(key: string) {
    return this._configService.getConfigValue(key);
  }
}
