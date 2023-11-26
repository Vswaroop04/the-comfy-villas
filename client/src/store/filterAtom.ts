import type TListingFilter from "@/types/ListingFilter";
import { atom } from "jotai";

const filterAtom = atom<TListingFilter>({});
export const filterPageAtom = atom<number>(1);

export default filterAtom;
