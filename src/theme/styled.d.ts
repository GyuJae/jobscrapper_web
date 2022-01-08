import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    basicWidth: string;
    jobWidth: string;

    color: {
      main: string;
      sub: string;
      accent: string;
    };
  }
}
