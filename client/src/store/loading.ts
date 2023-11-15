import { atom } from 'jotai';

function globalLoadingCreator(initialValue: boolean) {
	const globalLoading = atom(
		{
			isLoading: initialValue,
			reason: undefined,
		},
		(
			get,
			set,
			update:
				| boolean
				| {
						isLoading: boolean;
						reason?: string;
				  },
		) => {
			if (typeof update === 'boolean') {
				set(globalLoading, {
					isLoading: update,
					reason: undefined,
				});
			} else {
				set(globalLoading, update);
			}
		},
	);
	return globalLoading;
}

const globalLoadingAtom = globalLoadingCreator(false);
globalLoadingAtom.debugLabel = 'globalLoading';

export default globalLoadingAtom;
