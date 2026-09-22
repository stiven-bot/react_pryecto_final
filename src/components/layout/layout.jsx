import Header from "./header";

function Layout({ children }) {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
            <Header />

            <main>
                {children}
            </main>
        </div>
    );
}

export default Layout;