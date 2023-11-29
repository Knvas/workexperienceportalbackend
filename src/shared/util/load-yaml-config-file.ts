import * as yaml from "js-yaml";
import { readFileSync } from "fs";

export default (path: string): Record<any, any> => {
  return yaml.load(
    readFileSync(path, "utf-8")
  ) as Record<string, any>;
}