import { Component, Injectable,         } from '@angular/core';
import { BaseComponent                  } from '../../../basecomponent';
import { _environment                   } from '../../../../../environments/environment';
import { AuthService                    } from '../../../../_services/_config/auth.service';
import { _BaseModel, _BaseSearchResult  } from '../../../../_models/common/common';
import { _SearchState,_SortDirection    } from '../../../../_models/common/common';
import { ENV_LIST_CPP_DEMO              } from '../../../../_models/common/common';
import { _BaseSortEvent, _SortColumn    } from '../../../../_directives/BaseSortableHeader.directive';
import { ConfigService                  } from '../../../../_services/_config/config.service';
import { BaseService                    } from '../../../../_services/_config/base.service';

 
//
@Component({
  selector: 'app-cpp-demo',
  templateUrl: './cpp-demo.component.html',
  styleUrl: './cpp-demo.component.css'
})
export class CppDemoComponent extends BaseComponent {
    //
    constructor(public _service    : _BaseService,
                public _authService: AuthService,
				public _configService : ConfigService
				)
    {
		//
		super(_service, _authService, _configService, ENV_LIST_CPP_DEMO);
    }
}

@Injectable({
	providedIn: 'root'
})
class _BaseService  extends BaseService {
	
}
