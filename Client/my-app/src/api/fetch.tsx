interface TParamsFetch {
  url: string;
  token: string;
  body?: null | BodyInit;
  method?: "GET" | string;
  throwError?: boolean;
}

type Success<T> = {
  isError: false;
  meta : keyable<any>,
  result: T;
};

type Failed = {
  isError: true;
  err: string;
};

type Result<T> = Success<T> | Failed;

export default async function fetcher<T>(
  params: TParamsFetch
): Promise<Result<T>> {
  const { url, token, body, method, throwError } = params;
  try {
    const res = await fetch(url, {
      method: method,
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json;charset=UTF-8",
      },
      body: body,
    });
    const repo = await res.json();
    if (repo.error) {
      if (throwError) {
        throw repo.error.message;
      }
      return {
        isError: true,
        err: repo.error.message,
      };
    }
    return {
      meta : repo.meta,
      isError: false,
      result: repo.data,
    };
  } catch (error) {
    if (throwError) {
      throw error;
    }
    return {
      isError: true,
      err: "ERROR NOT FOUND",
    };
  }
}
