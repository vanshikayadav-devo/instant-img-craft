import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getResult } from "./webhook-results";

export const getProcessedImageUrl = createServerFn({ method: "POST" })
  .validator(z.object({ requestId: z.string() }))
  .handler(async ({ data }) => {
    const url = getResult(data.requestId);
    return { url, found: !!url };
  });
