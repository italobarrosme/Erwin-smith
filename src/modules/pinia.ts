import { createPinia } from "pinia";
import { ViteModule } from "@/@types";
import piniaPersist from "pinia-plugin-persist";

// Setup Pinia
// https://pinia.esm.dev/
export const install: ViteModule = ({ isClient, initialState, app }: any) => {
  const pinia = createPinia();
  app.use(pinia);
  pinia.use(piniaPersist);
  // Refer to
  // https://github.com/antfu/vite-ssg/blob/main/README.md#state-serialization
  // for other serialization strategies.
  if (isClient) pinia.state.value = initialState.pinia || {};
  else initialState.pinia = pinia.state.value;
};
