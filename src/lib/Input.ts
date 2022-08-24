export function useChange(event: any, setter: Function) {
  setter(event.target.value);
}
