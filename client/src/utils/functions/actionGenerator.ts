export const actionGenerator =
    <T>(type: string) =>
    (payload?: T) => ({ type, payload });
