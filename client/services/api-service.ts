async function initMocks() {
  if (typeof window === "undefined") {
    const { server } = await import("../src/mocks/server");
    await server.listen({ onUnhandledRequest: "bypass" });
  } else {
    const { worker } = await import("../src/mocks/browser");
    await worker.start({ onUnhandledRequest: "bypass" });
  }
}

// Note the change in ENV var name here
// https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#bundling-environment-variables-for-the-browser
if (process.env.NEXT_PUBLIC_MOCK_APIS === "enabled") {
  initMocks();
}

export const makeApiRequest = async (path: string) => {
  try {
    const resp = await fetch(path);
    if (resp.ok) {
      const result = await resp.json();
      return result;
    }
  } catch (err: any) {
    // handle errors
  }
};
