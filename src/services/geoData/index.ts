import { fetch } from "@services/index";
import { AxiosResponse } from "axios";

export function getCities(): Promise<AxiosResponse> {
  return fetch({
    baseURL: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10",
    method: "GET",
    headers: {
      "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
      "x-rapidapi-key": "d123753a3fmsh2352df4c8f08460p19b944jsn915e2630a1f0",
    },
  });
}
