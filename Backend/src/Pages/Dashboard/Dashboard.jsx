import Layout from '../../Layout'
import Property from './Property'
import Under_Offer from './Under_Offer'
import Sold from './Sold'
import Let from './Let'

export default function Dashboard() {
    document.title = 'Dashboard';
    return (
        <Layout>
            <section className='h-[80vh] p-1 md:p-10'>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className='bg-[#eaecee] rounded-xl border border-gray-300'>
                        <Property />
                    </div>

                    <div className='bg-[#eaecee] rounded-xl border border-gray-300'>
                        <Under_Offer />
                    </div>

                    <div className='bg-[#eaecee] rounded-xl border border-gray-300'>
                        <Sold />
                    </div>

                    <div className='bg-[#eaecee] rounded-xl border border-gray-300'>
                        <Let />
                    </div>
                </div>
            </section>
        </Layout>
    )
}
