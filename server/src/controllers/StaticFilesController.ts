import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";

export class StaticFilesController {
  /* Routes */
  public static routes: ServerRoute<ReqRefDefaults>[] = [
    {
      method: "GET",
      path: "/static/{filename*}",
      handler: {
        directory: {
          path: ".",
        },
      },
    },
  ];
}
