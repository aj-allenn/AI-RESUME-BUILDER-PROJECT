import React from 'react'

const Footer = () => {
  return (
    <>

     <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>



            <footer className="flex flex-wrap justify-center lg:justify-between overflow-hidden gap-10 md:gap-20 py-16 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500 bg-indigo-500">
                <div className="flex flex-wrap items-start gap-10 md:gap-[60px] xl:gap-[140px]">
                    <a href="">
                       
                    </a>
                    <div>
                        <p className="text-slate-100 font-semibold">Product</p>
                        <ul className="mt-2 space-y-2 text-white">
                            <li><a href="/" className="hover:text-indigo-600 transition">Home</a></li>
                            <li><a href="/" className="hover:text-indigo-600 transition">Support</a></li>
                            <li><a href="/" className="hover:text-indigo-600 transition">Pricing</a></li>
                            <li><a href="/" className="hover:text-indigo-600 transition">Affiliate</a></li>
                        </ul>
                    </div>
                 
                    <div>
                        <p className="text-slate-100 font-semibold">Legal</p>
                        <ul className="mt-2 space-y-2 text-white">
                            <li><a href="/" className="hover:text-indigo-600 transition">Privacy</a></li>
                            <li><a href="/" className="hover:text-indigo-600 transition">Terms</a></li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col max-md:items-center max-md:text-center gap-2 items-end">
                    <p className="max-w-60 text-white">Making every customer feel valued—no matter the size of your audience.</p>
                    <div className="flex items-center gap-4 mt-3">
                        <a href="https://dribbble.com/prebuiltui" target="_blank" rel="noreferrer">
                           
                        </a>
                        <a href="https://www.linkedin.com/company/prebuiltui" target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin size-5 text-white" aria-hidden="true">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect width="4" height="12" x="2" y="9"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </a>
                        
                        
                    </div>
                    <p className="mt-3 text-center text-white">© 2025 Resume Builder </p>
                </div>
            </footer>
      
    </>
  )
}

export default Footer
