export default function AppFooter() {
	return (
		<footer className="border-t border-black/5 py-5 mt-auto">
			<small className="opacity-50">
				&copy; {new Date().getFullYear()} Petsoft. All rights reserved.
			</small>
		</footer>
	);
}
