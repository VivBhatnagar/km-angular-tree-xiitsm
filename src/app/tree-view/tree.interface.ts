interface TreeNode {
  data: any;
  children: TreeNode[];
  showChildren?: boolean;
}

interface TreeModel {
  search: (filterText:string) => void;
  clearSearch: () => void;
}

export { TreeNode, TreeModel };