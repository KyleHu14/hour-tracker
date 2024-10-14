interface SessionProviderProps {
	children: React.ReactNode
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
	return <>{children}</>
}
