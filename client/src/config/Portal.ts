"use client"
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export const Portal: React.FC<React.PropsWithChildren> = ({ children }) => {
	const [portalElement, setPortalElement] = useState<React.ReactPortal | null>(
		null,
	);

	useEffect(() => {
		setPortalElement(createPortal(children, document.body));
	}, [children]);

	return portalElement;
};
