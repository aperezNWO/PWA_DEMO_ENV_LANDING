import { Component, QueryList, ViewChildren                     } from '@angular/core';
import { Observable                                             } from 'rxjs';
import { CppFeatures                                            } from '../../../../_models/CppDemo/CppFeatures';
import { CppFeatureListSortableHeader, _CppFeaturePageSortEvent } from '../../../../_directives/Demos/cppDemo/cpp-feature-list-sortable.directive';
import { CppFeaturesService                                     } from '../../../../_services/cppDemo/cpp-features.service';
import { AuthService                                            } from '../../../../_services/_config/auth.service';
import { SiteRole                                               } from '../../../../_models/common/common';
//
@Component({
  selector: 'app-cpp-demo',
  templateUrl: './cpp-demo.component.html',
  styleUrl: './cpp-demo.component.css'
})
export class CppDemoComponent {
    //
    public featurePagesList!: Observable<CppFeatures[]>;
    public total!           : Observable<number>;
    //
    public ConfigRoleString : string = SiteRole.RoleConfig.toString();
    // 
    @ViewChildren(CppFeatureListSortableHeader) headers: QueryList<CppFeatureListSortableHeader> | undefined;
    //
    constructor(public service    : CppFeaturesService,
                public authService: AuthService,
    ) 
    {
      this.featurePagesList = service.featurepageLists;
      this.total            = service.total;
    }
    //
    onSort({ _column, _direction }: _CppFeaturePageSortEvent) {
        //
        console.log ("onSort.column   :" + _column);
        //
        console.log ("onSort.direction:" + _column);
        // resetting other headers
        this.headers?.forEach((header) => {
          if (header.cppfeaturepagesortable !== _column) {
            header.cppfeaturepagedirection= '';
          }
        });
        //
        this.service.sortColumn    = _column;
        this.service.sortDirection = _direction;
    }
}
