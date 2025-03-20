import React from 'react'
import { TbBowlSpoon } from "react-icons/tb";
import { GiFruitBowl } from "react-icons/gi";

const typeData=[
    {
        id:1,
        title:"Keto",
        link:'#',
        icon:<TbBowlSpoon />
    },
    {
        id:2,
        title:"Vegan",
        link:'#',
        icon:<GiFruitBowl />
    },
    {
        id:1,
        title:"Keto",
        link:'#',
        icon:<TbBowlSpoon />
    },
    {
        id:2,
        title:"Vegan",
        link:'#',
        icon:<GiFruitBowl />
    },
    {
        id:1,
        title:"Keto",
        link:'#',
        icon:<TbBowlSpoon />
    },
    {
        id:2,
        title:"Vegan",
        link:'#',
        icon:<GiFruitBowl />
    },
    
]
function types() {
  return (
    <section className="bg-white">
        <div className="container mx-auto px-6 pb-12 mt-4 pt-6 animate-slide-in">
            <h1 className="text-4xl justify-center text-center font-bold  pb-10"><span className="font-bold text-yellow-400 hover:text-emerald-400">Diet types</span> we provide</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
                {typeData.map((type)=>(
                    <div className="bg-[#f4f4f4] rounded-2xl flex flex-col gap-4 items-center justify-center p-4 py-7 hover:bg-white hover:scale-110 duration-300 hover:shadow-2xl">
                        <div className="text-4xl mb-4">{type.icon}</div>
                        <h1 className="text-lg font-semibold text-center px-3">{type.title}</h1>

                    </div>

                ))

                }
            </div>

        </div>

    </section>
  )
}

export default types