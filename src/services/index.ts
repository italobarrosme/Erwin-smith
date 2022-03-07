import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";
import { useUIStore } from "@stores/ui";

type FetchParams = {
  baseURL?: string;
  path?: string;
  headers?: AxiosRequestHeaders | { Authorization: string };
  data?: JSON | Record<string, unknown>;
  params?: any;
  method?: AxiosRequestConfig["method"];
};

function requestInterceptor(config: any) {
  const ui = useUIStore();

  ui.toggleLoading(true);

  config.baseURL === `${import.meta.env.VITE_APP_BASE_URL || ""}/`;

  //   if (
  //     auth?.token &&
  //     config.baseURL === `${import.meta.env.VITE_APP_BASE_URL || ""}/`
  //   )
  //     config.headers.Authorization = `Bearer ${auth.token.accessToken}`;

  return config;
}

export function fetch({
  method = "GET",
  baseURL = `${import.meta.env.VITE_APP_BASE_URL || ""}/`,
  path,
  ...data
}: FetchParams): Promise<AxiosResponse> {
  const axiosInstance = axios.create();
  axiosInstance.interceptors.request.use(requestInterceptor);

  axiosInstance.interceptors.response.use(
    (config) => {
      const ui = useUIStore();
      ui.toggleLoading(false);

      return Promise.resolve(config);
    },
    (config) => {
      const ui = useUIStore();
      ui.toggleLoading(false);

      return Promise.reject(config);
    }
  );

  return axiosInstance({
    method,
    baseURL,
    url: path,
    ...data,
  });
}
