import TUser from '@/types/user';
import { atom } from 'jotai';

// export const userAtom = atom<Partial<TUser> | undefined>(devTemp);
// export const userAtom = atom<Partial<TUser> | undefined>(prodTemp);
export const userAtom = atom<Partial<TUser> | undefined>(undefined);
userAtom.debugLabel = 'userAtom';

export default userAtom;
