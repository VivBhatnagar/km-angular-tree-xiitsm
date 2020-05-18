import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import {
	HttpClientTestingModule,
	HttpTestingController,
} from "@angular/common/http/testing";
import { AppComponent } from "./app.component";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe("App component unit tests", () => {
	let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpMock: HttpTestingController;
  let mockTreeResponse = {
    hierarchy: {
      name: "Root Node",
      type: "company",
      hierarchy_node: {
        name: 'Root Node',
        type: 'folder',
        children: {
          hierarchy_node: [{
            name: 'Child node1',
            type: 'folder'
          }]
        }
       }
    }
  };

	beforeAll(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
		});
		fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    httpMock = TestBed.get(HttpTestingController);    
    comp.treeViewModel = {
      search: (searchText: string) => {},
      clearSearch: () => {}
    }
	});

	it("should be truthy", () => {
		expect(comp).toBeDefined();
  });
  
  it('should call tree json and format tree structure', () => {
    comp.ngOnInit();
    let mockReq = httpMock.expectOne(
      'assets/tree.json'
    );
    mockReq.flush(mockTreeResponse);
    httpMock.verify();
    console.log(comp.nodes);
    expect(comp.nodes[0].data.name).toBe('Root Node');
  });

  it('should set expandAll flag as true', () => {
    comp.expandAll();
    expect(comp.expandAllNodes).toBe(true);
  });

  it('should set expandAll flag as false', () => {
    comp.collapseAll();
    expect(comp.expandAllNodes).toBe(false);
  });

  it('should call treemodel.Search function on search node', () => {
    comp._searchNodeStr = 'test';
    let searchSpy = spyOn(comp.treeViewModel, 'search');  
    comp.searchNode();
    expect(searchSpy).toHaveBeenCalledWith('test');
  });

  it('should call treemodel.ClearSearch function on clear search', () => {
    let clearSearchSpy = spyOn(comp.treeViewModel, 'clearSearch');  
    comp.clearSearch();
    expect(clearSearchSpy).toHaveBeenCalled();
  });

  it('should call console log on logSelectedNode', () => {
    let logSpy = spyOn(console, 'log');
    comp.logSelectedNode(comp.nodes[0].children[0]);
    expect(logSpy).toHaveBeenCalled();
  });
});
