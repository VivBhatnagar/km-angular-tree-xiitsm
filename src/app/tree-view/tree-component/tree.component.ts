import {
  Component,
  Input,
  Output,
  ViewEncapsulation,
  EventEmitter,
  ChangeDetectorRef,
  DoCheck
} from "@angular/core";
import { TreeNode } from "../tree.interface";

@Component({
  selector: "tree-comp",
  templateUrl: "./tree.component.html",
  styleUrls: ["./tree.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class TreeComponent implements DoCheck {
  @Input() treeData: TreeNode[] = [];
  @Input() expandAll: boolean = false;
  @Input() isNested: boolean = false;
  @Input() searchNode: string = "";
  @Output() onNodeSelected = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef) {}

  ngDoCheck() {
    this.cdr.detectChanges();
  }

  toggleChild(e: Event, node: TreeNode) {
    e.preventDefault();
    e.stopPropagation();
    node.showChildren = !node.showChildren;
  }

  nodeSelected(node: TreeNode) {
    this.onNodeSelected.emit(node);
  }
}
