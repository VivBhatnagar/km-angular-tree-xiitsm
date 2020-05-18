import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { TreeComponent } from "./tree-component/tree.component";
import { TreeContainer } from "./tree-container/tree-container.component";
import { HighlightTextPipe } from "./pipes/highlight-text.pipe";
import { TreeNode, TreeModel } from './tree.interface';


@NgModule({
  imports: [CommonModule],
  declarations: [HighlightTextPipe, TreeComponent, TreeContainer],
  exports: [TreeContainer]
})
class TreeModule {}

export { TreeModule, TreeNode, TreeModel }