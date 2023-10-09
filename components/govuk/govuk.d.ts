declare module "govuk-frontend" {
  export interface ButtonConfig {
    preventDoubleClick?: boolean;
  }
  export declare class Button {
    constructor($module: HTMLElement, config?: ButtonConfig);
    $module: HTMLElement;
    config: ButtonConfig;
    static defaults: ButtonConfig;
  }
}
