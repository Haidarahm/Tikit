import React, { useState } from "react";
import TextInput from "./TextInput";
import NumberInput from "./NumberInput";
import NationalityInput from "./NationalityInput";

const InfluencersRegister = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [nationality, setNationality] = useState(null);

  return (
    <section
      data-nav-color="black"
      className="w-full min-h-screen flex flex-col items-center mt-[104px] "
    >
      <div className="title py-[100px]">
        <h1 className="lg:text-[75px] 2xl:text-[80px] font-antonio font-[700] text-center text-[var(--foreground)] leading-tight capitalize will-change-transform">
          Want to be managed by Tikit?
        </h1>
      </div>
      <div className="main-content px-[12px] md:px-[75px] w-full">
        <div className="container  py-[15px] md:py-[45px] flex flex-col items-center w-full rounded-[25px] border border-[var(--foreground)]/10 bg-white">
          <div className="title  text-center text-[var(--foreground)]  text-[20px] m:text-[24px] lg:text-[34px] xl:text-[42px] font-medium font-antonio leading-tight capitalize will-change-transform">
            <h2>fill the registration form</h2>
          </div>
          <div className="main-content mt-[10px] md:mt-[30px] w-full px-[20px] md:px-[80px] flex flex-col gap-4">
            <TextInput name="fullName" placeholder="Name" label={"Full Name"} />
            <TextInput
              name="email"
              placeholder="example@gmail.com"
              label={"Email Address"}
            />
            <NumberInput
              name="phoneNumber"
              label="Phone Number"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              selectedCountry={selectedCountry}
              onCountryChange={setSelectedCountry}
            />
            <NationalityInput
              name="nationality"
              label="Nationality"
              placeholder="Select your nationality"
              value={nationality}
              onChange={setNationality}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfluencersRegister;
