import {
  Component,
  Input,
  ViewEncapsulation,
  OnInit,
  OnChanges,
  Output,
  EventEmitter
} from "@angular/core";
import { cloneDeep } from 'lodash';
import { TreeNode, TreeModel } from "../tree.interface";

@Component({
  selector: "tree-container",
  templateUrl: "./tree-container.component.html",
  styleUrls: ["./tree-container.component.scss"]
})
export class TreeContainer implements OnInit, OnChanges, TreeModel {
  @Input() treeData: TreeNode[] = [];
  @Input() scrollContainerRef: HTMLElement = undefined;
  @Input() expandAll: boolean = false;
  @Output() onNodeSelected = new EventEmitter();
  _treeData: TreeNode[] = [];
  searchNode: string = "";

  ngOnInit() {
    this._treeData = this.treeData;
  }

  ngOnChanges(changes: any) {
    if (changes.treeData) {
      this._treeData = changes.treeData.currentValue;
    }
  }

  nodeSelected(node: TreeNode) {
    this.onNodeSelected.emit(node);
  }

  private filterNodes(regex: RegExp, data: TreeNode[]) {
    let filteredList = [];
    if (data) {
      filteredList = data.filter(node => {
        if (regex.test(node.data.name.toLowerCase())) {
          let filteredChildNodes = this.filterNodes(regex, node.children);
          if(filteredChildNodes.length > 0) { 
            node.children = filteredChildNodes;
          }
          return node;
        } else if (node.children.length > 0) {
          let filteredChildNodes = this.filterNodes(regex, node.children);
          if(filteredChildNodes.length > 0) { 
            node.children = filteredChildNodes;
            return node; 
          }
        }
      });
    }
    return filteredList;
  }

  search(text: string) {
    if (text) {
      let pattern = text.toLowerCase().replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
      pattern = pattern
        .split(" ")
        .filter(t => {
          return t.length > 0;
        })
        .join("|");
      const regex = new RegExp(pattern, "i");
      this._treeData = this.filterNodes(regex, cloneDeep(this.treeData));
    } else {
      this._treeData = this.treeData;
    }    
    this.searchNode = text;
  }

  clearSearch() {
    this.search('');
  }
}
