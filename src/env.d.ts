declare module "astro" {
  export interface Component {
    (props: Record<string, any>): any;
  }
}

declare module "astro:components" {
  export const Slot: Component;
}
