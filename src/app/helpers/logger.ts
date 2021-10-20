export const logger = {
  info(data: any) {
    return this.log(data);
  },
  error(data: any) {
    return this.log(data);
  },
  log(data: any) {
    console.log(data);
    return true;
  },
};
