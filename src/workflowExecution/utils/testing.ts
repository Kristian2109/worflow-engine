export function sleep(delay: number) { 
  return new Promise(resove => {
    setTimeout(resove, delay);
  }) 
}