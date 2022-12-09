import { IPlay } from "../types/play";

export function makeid(length: number, exclude: string[] = []): string {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var charactersLength = characters.length;
  do {
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  } while (exclude.indexOf(result) !== -1);
  return result;
}

export async function loadPlay(scenario: string): Promise<IPlay> {
  console.log("Loading Play:", scenario);
  const play = (await import(`../plays/${scenario}.json`)).default as IPlay;
  return play;
}
