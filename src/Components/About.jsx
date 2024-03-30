import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="w-full bg-black">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 w-[100%]">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-400   sm:text-5xl">
            Welcome to Rental-Services
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Your premier destination for hassle-free renting and listing services
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:gap-8  md:grid-cols-3">
          <div className="rounded-lg bg-black overflow-hidden shadow border-cyan-600 border-[0.5px]">
            <div className="px-4 py-3">
              <Link to="/" ><img  className="h-72 w-full object-cover bg-slate-900" src="https://th.bing.com/th/id/R.1e05a44ab7a93b87ffd960eb10b066da?rik=eTb3TvqmOOG%2bNA&riu=http%3a%2f%2fwww.moredividends.com%2fwp-content%2fuploads%2f2018%2f10%2fbuy-dont-sell.jpg&ehk=uHgeQxWuM%2bJbPx98kjuKsnWVTYO0S%2fOXQWbmIM8G9eo%3d&risl=&pid=ImgRaw&r=0" alt="Placeholder" /></Link>
            </div>
          </div>
          <div className="rounded-lg bg-black overflow-hidden shadow  border-cyan-600 border-[0.5px]">
            <div className="px-4 py-3">
              <img className="h-72 w-full object-cover" src="https://img.epicnpc.com/xf/data/avatars/o/912/912538.jpg?1575659391" alt="Placeholder" />
            </div>
          </div>
          <div className="rounded-lg bg-black overflow-hidden shadow  border-cyan-600 border-[0.5px]">
            <div className="px-4 py-3">
             <Link to="/createlist"><img className="h-72 w-full object-cover" src="https://thumbs.dreamstime.com/b/sell-everyone-buying-spotlight-illuminates-bright-red-dark-background-buys-33851003.jpg" alt="Placeholder" /></Link>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <h3 className="text-3xl font-extrabold  text-gray-400 sm:text-4xl">What We Offer</h3>
          <p className="mt-4 text-xl text-gray-600">
            Rent-Services is committed to providing a seamless experience for both renters and listers. Our services include:
          </p>
          <ul className="mt-6 text-lg text-gray-600 list-disc list-inside">
            <li>Easy listing of products for rent</li>
            <li>User-friendly interface for browsing and searching</li>
            <li>Secure payment processing</li>
            <li>Dedicated customer support</li>
          </ul>
        </div>
        <div className="mt-12 text-center">
          <h3 className="text-3xl font-extrabold  text-gray-400 sm:text-4xl">Our Customers</h3>
          <p className="mt-4 text-xl text-gray-600 ">
            Rent-Services is proud to serve a diverse range of customers, including individuals, businesses, and organizations.
          </p>
        </div>
        <div className="flex flex-col mt-12 text-center w-[100%]">
          <h3 className="text-3xl font-extrabold  text-gray-400  sm:text-4xl">Contact Us</h3>
          <p className="mt-4 text-xl text-gray-600">
            For any inquiries or assistance, please feel free to contact us:
          </p>
          <ul className="flex justify-between mt-6 text-lg text-gray-600 list-disc">
            <li>Phone : 9399769550</li>
            <li>Email : <a className="text-blue-500" href="mailto:reactvishal@gmail.com">reactvishal@gmail</a></li>
            <li>Website : <a target='_blank' href="https://hive.blog/@okluvmee" className="text-blue-500">rentalservices.com</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
