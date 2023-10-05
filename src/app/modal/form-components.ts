import { CommentComponent } from "../form/comment.component";
import { ContactComponent } from "../form/contact.component";


export class FormComponents {
  private components: { [index: string]: any } = {
    comment: CommentComponent,
    contact: ContactComponent
  }

  getComponent(component: string) {
    if (component) {
      if (!this.components[component]) {
        throw Error(`the component does not exist (you called '${component}')`)
      }
      return this.components[component];
    }
  }
}
