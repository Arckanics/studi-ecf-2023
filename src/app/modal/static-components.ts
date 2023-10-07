import { HoursComponent } from "../component/hours.component";


export class StaticComponents {
  private components: { [index: string]: any } = {
    hours: HoursComponent
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
