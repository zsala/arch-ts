import ClassFunction from "./class.function";
import ClassConstructor from "./class.constructor";

export enum ClassType {
  CLASS = 'class',
  INTERFACE = 'interface'
}

export default interface ClassInfo {
  name: string;
  extends?: string;
  implements?: string[];
  type: ClassType;
  properties: { name: string; type: string }[];
  constructorInfo?: ClassConstructor;
  functions?: ClassFunction[];
}
