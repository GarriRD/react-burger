import { FC, ReactNode } from "react";

export type FCWithChildren<T extends Record<string, any> = {}> = FC<{ children: ReactNode } & T>