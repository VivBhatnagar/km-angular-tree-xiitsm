import { TreeComponent } from './tree.component';
import { TreeNode } from '../tree.interface';

describe('tree component unit tests', () => {
  let comp: TreeComponent;
  let cdrSpy;

  beforeAll(() => {
    cdrSpy = {
      detectChanges: () => {}
    };
    comp = new TreeComponent(cdrSpy);
  });

  it('should be truthy', () => {
    expect(comp).toBeDefined();
  });

  it('should set show children flag of TreeNode', () => {
    let node:TreeNode = {
      data: {
        name: 'test node'
      },
      children: [],
      showChildren: false
    };
    let event = new Event('click');
    comp.toggleChild(event, node);
    expect(node.showChildren).toBe(true);
  });

  it('should emit node on selection', () => {
    let node:TreeNode = {
      data: {
        name: 'test node'
      },
      children: [],
      showChildren: false
    };
    comp.onNodeSelected.subscribe(node => {
      expect(node.data.name).toBe('test node');
    });

    comp.nodeSelected(node);
  });

  it('should call detectChanges on ngDoCheck', () => {
    let _cdrSpy = spyOn(cdrSpy, 'detectChanges');
    comp.ngDoCheck();
    expect(_cdrSpy).toHaveBeenCalled();
  });
})