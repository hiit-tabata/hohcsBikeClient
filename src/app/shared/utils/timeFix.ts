// TO fix the time diff. in angyular with timezone and the data input from the server, minus  8 hours to display correct date
export function timeFix(IsoDate){
  let d = new Date(IsoDate);
  return d.setHours(d.getHours() - 8);
}
