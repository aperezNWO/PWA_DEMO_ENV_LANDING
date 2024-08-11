import { Injectable, PipeTransform                                                     } from '@angular/core';
import { BehaviorSubject, debounceTime, delay, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { DecimalPipe                                                                   } from '@angular/common';
import { _BaseModel, _BaseSearchResult, _SortDirection,  compare                       } from '../../_models/common/common';
import { _SortColumn                                                                   } from '../../_directives/BaseSortableHeader.directive';

//
interface _SearchState {
	page          : number;
	pageSize      : number;
	searchTerm    : string;
	sortColumn    : _SortColumn;
	sortDirection : _SortDirection;
}
//
function sort(pagelist: _BaseModel[], column: _SortColumn, direction: string): _BaseModel[] {
	if (direction === '' || column === '') {
		return pagelist;
	} else {
		return [...pagelist].sort((a, b) => { 
			const res = compare(a[column], b[column]);
			return direction === 'asc' ? res : -res;
		});
	}
}
//
function matches(netcoreConfigPagelist: _BaseModel, term: string, pipe: PipeTransform) {
	return (
		netcoreConfigPagelist.name.toLowerCase().includes(term?.toLowerCase())        ||
		netcoreConfigPagelist.description.toLowerCase().includes(term?.toLowerCase()) ||
		netcoreConfigPagelist.field_1?.toLowerCase().includes(term?.toLowerCase())    ||
		netcoreConfigPagelist.field_2?.toLowerCase().includes(term?.toLowerCase())    ||
		netcoreConfigPagelist.field_3?.toLowerCase().includes(term?.toLowerCase())    ||
		netcoreConfigPagelist.field_4?.toLowerCase().includes(term?.toLowerCase())    ||
		netcoreConfigPagelist.field_5?.toLowerCase().includes(term?.toLowerCase())    ||
		netcoreConfigPagelist.field_6?.toLowerCase().includes(term?.toLowerCase())    ||
		netcoreConfigPagelist.field_7?.toLowerCase().includes(term?.toLowerCase())    ||
		netcoreConfigPagelist.field_8?.toLowerCase().includes(term?.toLowerCase())    ||
		netcoreConfigPagelist.field_9?.toLowerCase().includes(term?.toLowerCase())    ||
		netcoreConfigPagelist.field_10?.toLowerCase().includes(term?.toLowerCase())    
	);
}

@Injectable({
  providedIn: 'root'
})
export class BaseService  {
	  //
	  public _loading               = new BehaviorSubject<boolean>(true);
	  public _total                 = new BehaviorSubject<number>(0);
	  public _search$               = new Subject<void>();
	  //
	  get total() {
		  return this._total!.asObservable();
	  }
	  //
	  get loading() {
		  return this._loading!.asObservable();
	  }
	//
	private _Pagelist                     = new BehaviorSubject<_BaseModel[]>([]);
	//
	public _SEARCH_PAGES  : _BaseModel[] = [];
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
		this._search$
			.pipe(
				tap(() => this._loading!.next(true)),
				debounceTime(200),
				switchMap(() => this._search()),
				delay(200),
				tap(() => this._loading!.next(false)),
			)
			.subscribe((result) => {
				this._Pagelist!.next(result.searchPages);
				this._total!.next(result.total);
			});
		//
		this._search$.next();
	}
	//
	private _search(): Observable<_BaseSearchResult> {
		//
		let _searchPages  : any;
		let _total        : any;
		let _searchResult : _BaseSearchResult = { searchPages: _searchPages, total: _total };

		// 0. get state
		const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

		//
		_searchPages = sort(this._SEARCH_PAGES, sortColumn, sortDirection);

		// 2. filter
		_searchPages = _searchPages.filter((_searchPage: _BaseModel) => matches(_searchPage, searchTerm, this.pipe));
		_total       = _searchPages.length;

		// 3. paginate
		_searchPages = _searchPages.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

		// 4. return
		_searchResult = { searchPages: _searchPages, total: _total };

		// 5. return
		return of(_searchResult);
	}
	//////////////////////////////////////////////////////////////////////
	// PROPERTIES
	//////////////////////////////////////////////////////////////////////
	//
	public get Pagelist() {
		return this._Pagelist!.asObservable();
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
	set sortColumn(sortColumn: _SortColumn) {
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
