export const fetchLogged = async (
  input: RequestInfo,
  init?: RequestInit | undefined,
) => {
  console.log(`Fetch request: ${input.toString()}`, {
    init,
  });

  const res = fetch(input, init);
  return res;
};
