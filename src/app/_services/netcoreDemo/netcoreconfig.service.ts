import { Injectable, PipeTransform                } from '@angular/core';
import { DecimalPipe                              } from '@angular/common';
import { _NetCoreConfigSortColumn                 } from '../../_directives/Demos/netcoreDemo/NetCoreConfigListSortableHeader.directive';
import { _SortDirection, BaseModel, BaseService, compare     } from '../../_models/common/common';
import { _NetCorConfigSearchResult, NetCoreConfig } from '../../_models/netCoreDemo/netCoreConfig';
import { _environment                             } from '../../../environments/environment';
import { BehaviorSubject, debounceTime, delay, Observable, of, Subject, switchMap, tap } from 'rxjs';
//
interface _SearchState {
	page          : number;
	pageSize      : number;
	searchTerm    : string;
	sortColumn    : _NetCoreConfigSortColumn;
	sortDirection : _SortDirection;
}
//
function sort(netcoreConfigPagelist: NetCoreConfig[], column: _NetCoreConfigSortColumn, direction: string): NetCoreConfig[] {
	if (direction === '' || column === '') {
		return netcoreConfigPagelist;
	} else {
		return [...netcoreConfigPagelist].sort((a, b) => {
			const res = compare(a[column], b[column]);
			return direction === 'asc' ? res : -res;
		});
	}
}

//
function matches(netcoreConfigPagelist: NetCoreConfig, term: string, pipe: PipeTransform) {
	return (
		netcoreConfigPagelist.name.toLowerCase().includes(term?.toLowerCase()) ||
		netcoreConfigPagelist.description.toLowerCase().includes(term?.toLowerCase()) ||
		netcoreConfigPagelist.framework.toLowerCase().includes(term?.toLowerCase()) ||
		netcoreConfigPagelist.keywords.toLowerCase().includes(term?.toLowerCase())
	);
}
@Injectable({
	providedIn: 'root'
})
export class NetcoreconfigService extends BaseService {
	//
	private _netcoreConfigPagelist = new BehaviorSubject<NetCoreConfig[]>([]);
	//
	public _state: _SearchState = {
		page          : 1,
		pageSize      : 4,
		searchTerm    : '',
		sortColumn    : '',
		sortDirection : '',
	};
	//
	constructor(private pipe: DecimalPipe) {
		//
		super();
		//
		this._search$
			.pipe(
				tap(() => this._loading!.next(true)),
				debounceTime(200),
				switchMap(() => this._search()),
				delay(200),
				tap(() => this._loading!.next(false)),
			)
			.subscribe((result) => {
				this._netcoreConfigPagelist!.next(result.netcoreConfigPages);
				this._total!.next(result.total);
			});
		//
		this._search$.next();
	}
	//
	private _search(): Observable<_NetCorConfigSearchResult> {
		//
		let _netCoreConfigList: any;
		let _total: any;
		let _searchResult: _NetCorConfigSearchResult = { netcoreConfigPages: _netCoreConfigList, total: _total };

		// 0. get state
		const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

		//
		console.log("external json data : " + _environment.netCoreConfigList);

		// 1. sort
		let _NETCORECONFIG_PAGES: NetCoreConfig[] = [];
		//
		_environment.netCoreConfigList.forEach((element: any) => {
			_NETCORECONFIG_PAGES.push(element);
			console.log(element)
		});
		//
		_netCoreConfigList = sort(_NETCORECONFIG_PAGES, sortColumn, sortDirection);

		// 2. filter
		_netCoreConfigList = _netCoreConfigList.filter((_netCoreConfigList: NetCoreConfig) => matches(_netCoreConfigList, searchTerm, this.pipe));
		_total             = _netCoreConfigList.length;

		// 3. paginate
		_netCoreConfigList = _netCoreConfigList.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

		// 4. return
		_searchResult = { netcoreConfigPages: _netCoreConfigList, total: _total };

		// 5. return
		return of(_searchResult);
	}
	//////////////////////////////////////////////////////////////////////
	// PROPERTIES
	//////////////////////////////////////////////////////////////////////
	//
	public get NetcoreConfigPagelist() {
		return this._netcoreConfigPagelist!.asObservable();
	}
	//
	get page() {
		return this._state.page;
	}
	//
	set page(page: number) {
		this._set({ page });
	}
	//
	public get pageSize() {
		return this._state.pageSize;
	}
	//
	set pageSize(pageSize: number) {
		this._set({ pageSize });
	}
	//
	get searchTerm() {
		return this._state.searchTerm;
	}
	//
	set searchTerm(searchTerm: string) {
		this._set({ searchTerm });
	}
	//
	set sortColumn(sortColumn: _NetCoreConfigSortColumn) {
		this._set({ sortColumn });
	}
	//
	set sortDirection(sortDirection: _SortDirection) {
		this._set({ sortDirection });
	}
	//
	private _set(patch: Partial<_SearchState>) {
		Object.assign(this._state, patch);
		this._search$.next();
	}

}