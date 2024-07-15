/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'splitpanes' {
  let Splitpanes: any
  let Pane: any

  export { Splitpanes, Pane }
}
