// components/StepperForm.js
'use client';

import React, { useState } from 'react';

const Step1 = ({ formData, setFormData, nextStep }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setFormData({ ...formData, answer: event.target.value });
  };

  return (
    <div>
      <h2 className="text-2xl mt-4 font-Montserrat font-semibold text-center">Step #1</h2> 
      <p className="text-2xl mb-6 font-Montserrat font-semibold text-center">What is your monthly digital marketing budget?</p>
      <div className="mb-4">
        {['< $1,000/month', '$1,000 - $2,000', '$2,000 - $5,000', '$5,000 - $10,000', '$10,000 - $25,000', '$25,000'].map((option, index) => (
          <div key={index} className="mb-2">
            <label className="flex items-center space-x-2 p-3 rounded-md border-1 hover:bg-green-200 has-[:checked]:bg-green-500">
              <input
                type="radio"
                value={option}
                checked={formData.answer === option}
                onChange={handleOptionChange}
                className="form-radio w-0 h-0 appearance-none"
              />
              <span>{option}</span>
            </label>
          </div>
        ))}
      </div>
      {selectedOption && (
        <div className='flex justify-center'>
          <button onClick={nextStep} className="bg-green-500 text-white p-3">
            Next
          </button>
        </div>
      )}
    </div>
  );
};

const Step2 = ({ formData, setFormData, nextStep, prevStep }) => {
  return (
    <div>
      <h2 className="flex text-2xl mt-3 font-lato justify-center">Step #2</h2>
      <h3 className="flex text-2xl mb-2 font-lato justify-center">Details</h3>
      <p className="mb-4 text-center font-lato">We’re thrilled at the opportunity to help you grow your business online.Please let us know the best way to reach you.</p>
      <div className="mb-4">
        <label className="block mb-2">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Phone Number</label>
          <input
            type="number"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="border p-2 w-full"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Anything else you would like to share?</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="border p-2 w-full"
        />
      </div>
      <div className="flex justify-center">
        <button onClick={nextStep} className="bg-green-500 text-white p-3 font-lato">
          Send Request
        </button>
      </div>
     
      <div className='mt-4 text-center text-lato text-gray-400' >We promise never to share your information or spam your inbox</div>
    </div>
  );
};

const Step3 = ({ returnToHome }) => {
  return (
    <div>
        <div className="flex justify-center mb-4">
  <div className="h-32 w-32 bg-gray-300"></div>
</div>
      <h2 className="text-2xl mb-2 text-center">Your Request for a Proposal Has <br/> Been Submitted!</h2>
      <p className="mb-4 text-center">lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua obcaecati</p>
      <div className="flex justify-center">

    <button onClick={returnToHome} className="bg-green-500 text-white p-3">
        Return Home
      </button>
      </div>
    </div>
  );
};

const StepperForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    answer: '',
    name: '',
    address: '',
    email: '',
    description: '',
    password: '',
  });

  const nextStep = () => {
    if (step === 1 && !formData.answer) {
      alert('Please select an option');
      return;
    }
    if (step === 2 && (!formData.name || !formData.address || !formData.email)) {
      alert('Error! Please Fill All The Details');
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const returnToHome = () => {
    setStep(1);
    setFormData({
      answer: '',
      name: '',
      address: '',
      email: '',
      description: '',
      password: '',
    });
  };

  // Calculate progress based on the current step
  const progress = ((step - 0) / 3) * 100;

  return (
    
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
        <button onClick={() => setStep(1)} className="absolute top-0 right-1 mt-0 mr-0 font-bold text-black p-2 rounded-lg">
          Exit X
        </button>
        <button onClick={prevStep} className="absolute top-0 left-1 text-black font-bold p-2 mt-0 ml-0">
        ← Go Back
      </button>
        <div className="absolute top-12 left-0 w-full h-2 bg-gray-300">
          <div className="h-full bg-green-500" style={{ width: `${progress}%` }}></div>
        </div>
      <div className="max-w-xl w-full p-4 rounded-lg relative">
        {step === 1 && <Step1 formData={formData} setFormData={setFormData} nextStep={nextStep} />}
        {step === 2 && <Step2 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
        {step === 3 && <Step3 returnToHome={returnToHome} />}
      </div>
    </div>
  );
};

export default StepperForm;
