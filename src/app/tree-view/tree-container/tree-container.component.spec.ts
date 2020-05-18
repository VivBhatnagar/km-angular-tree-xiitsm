import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Component, SimpleChange } from '@angular/core';
import { TreeContainer } from './tree-container.component';

//https://medium.com/@christophkrautz/testing-ngonchanges-in-angular-components-bbb3b4650ee8

describe('tree container component unit tests', () => {
  let fixture:ComponentFixture<TreeContainer>;
  let comp: TreeContainer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreeContainer],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(TreeContainer);
    comp = fixture.componentInstance;
  });

  it('should be truthy', () => {
    expect(comp).toBeDefined();
  });

  it('should set Input treeData to private variable', () => {
    comp.treeData = [];
    comp._treeData = null;
    comp.ngOnInit();
    expect(comp._treeData).not.toBeNull();
  });

  it('should set Input treeData to private variable on ngonchange', () => {
    comp._treeData = null;
    comp.ngOnChanges({
      treeData: new SimpleChange(null, [], true)
    });
    expect(comp._treeData).not.toBeNull();
  });

  it('should emit node on selection', () => {
    comp.onNodeSelected.subscribe(node => {
      expect(node.data.name).toBe('test node');
    });
    
    comp.nodeSelected({
      data: {
        name: 'test node'
      },
      children: []
    });
  });

  it('should filter nodes on search: top level', () => {
    comp.treeData = [{
      data: {
        name: "Root Node",
        type: "company",
      },
      children: [{
        data: {
          name: 'ChildNode1',
          type: 'folder'
        },
        children: []
      }, {
        data: {
          name: 'ChildNode2',
          type: 'folder'
        },
        children: []
      }]
    }];

    comp.search('Root');
    expect(comp._treeData.length).toBe(comp.treeData.length);
  });

  it('should filter nodes on search: sub level1', () => {
    comp.treeData = [{
      data: {
        name: "Root Node",
        type: "company",
      },
      children: [{
        data: {
          name: 'ChildNode1',
          type: 'folder'
        },
        children: []
      }, {
        data: {
          name: 'ChildNode2',
          type: 'folder'
        },
        children: []
      }]
    }];

    comp.search('ChildNode1');
    expect(comp._treeData[0].children.length).toBe(1);
  });

  it('should filter nodes on search: sub level2', () => {
    comp.treeData = [{
      data: {
        name: "Root test Node",
        type: "company",
      },
      children: [{
        data: {
          name: 'ChildNode1',
          type: 'folder'
        },
        children: []
      }, {
        data: {
          name: 'ChildNode2',
          type: 'folder'
        },
        children: []
      }, {
        data: {
          name: 'Child testNode1',
          type: 'folder'
        },
        children: []
      }, {
        data: {
          name: 'Child testNode2',
          type: 'folder'
        },
        children: []
      }]
    }];

    comp.search('test');
    expect(comp._treeData[0].children.length).toBe(2);
  });

  it('should return original treedata on clear search', () => {
    comp.treeData = [{
      data: {
        name: "Root Node",
        type: "company",
      },
      children: [{
        data: {
          name: 'ChildNode1',
          type: 'folder'
        },
        children: []
      }, {
        data: {
          name: 'ChildNode2',
          type: 'folder'
        },
        children: []
      }]
    }];

    comp.clearSearch();
    expect(comp._treeData.length).toBe(comp.treeData.length);
  });
});
