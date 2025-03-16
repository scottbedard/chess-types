/** Test if string `T` includes string `U` */
export type Includes<T extends string, U extends string> =
  T extends `${string}${U}${string}` ? true : false
