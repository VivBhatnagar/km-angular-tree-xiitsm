import { Component, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TreeNode, TreeModel } from "./tree-view";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  @ViewChild('treeViewModel') treeViewModel: TreeModel;
  name = "Angular";
  nodes: TreeNode[] = [];
  _searchNodeStr: string = "";
  expandAllNodes = false;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient.get("assets/tree.json").subscribe((data: any) => {
      let rootTreeNode = this.createTreeFormat(data.hierarchy.hierarchy_node);
      this.nodes = [rootTreeNode];
    });
  }

  createTreeFormat(data: any) {
    let treeNode: TreeNode = {
      data: {
        name: data.name,
        type: data.type
      },
      children: []
    };
    if (data.children && data.children.hierarchy_node) {
      let children = Array.prototype.slice.call(data.children.hierarchy_node);
      for (let child of children) {
        let childNode = this.createTreeFormat(child);
        treeNode.children.push(childNode);
      }
    }
    return treeNode;
  }

  logSelectedNode(node: TreeNode) {
    console.log(node);
  }

  searchNode() {
    let findNode = this._searchNodeStr;
    this._searchNodeStr = "";
    this.treeViewModel.search(findNode);
    this.expandAll();
  }

  expandAll() {
    this.expandAllNodes = true;
  }

  collapseAll() {
    this.expandAllNodes = false;
  }

  clearSearch() {
    this.treeViewModel.clearSearch();
    this.collapseAll();
  }
}
