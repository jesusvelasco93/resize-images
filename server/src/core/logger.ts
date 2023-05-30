const Logger = {
  debug: (filename: string, trace: string) => {
    // Use here the logger that you want
    console.log(` - ${filename}: `, trace);
  },
  error: (filename: string, message: string) => {
    // Use here the logger that you want
    console.error(` - ${filename}: `, message);
  },
};

export default Logger;
