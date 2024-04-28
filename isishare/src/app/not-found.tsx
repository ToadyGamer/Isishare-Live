export default function NotFound(){
    return(
        <section className="bg-white">
        <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="wf-ull lg:w-1/2 mt-16">
            <img src="/isishare.png" alt="" />
            <p className="ml-28 text-gray-500 dark:text-gray-400">Désolé, la page que vous recherchez n'existe pas.</p>

            <div className="flex items-center mt-6 gap-x-3 ml-28">
                <a href="/" className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>
                    <span>Retour</span>
                </a>
            </div>
        </div>

        <div className="relative w-full lg:w-1/2 lg:mt-0">
            <img className="w-full max-w-lg lg:mx-auto" src="/404.svg"/>
        </div>
    </div>
</section>
    )
}