import { useState } from "react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is NextScholars?",
      answer:
        "NextScholars is a scholarship management platform where students can explore, apply for, and track scholarships offered by global universities.",
    },
    {
      question: "Is it free to use?",
      answer:
        "Yes! Browsing and applying to scholarships is completely free. However, some applications may involve university-specific service charges.",
    },
    {
      question: "Can I edit my application after submission?",
      answer:
        "You can only edit your application before it has been processed. Once it's under review, editing is disabled for accuracy.",
    },
    {
      question: "How do I know if I got the scholarship?",
      answer:
        "You’ll receive an email notification and the status will update on your dashboard once a decision has been made.",
    },
    {
      question: "Who can post scholarships?",
      answer:
        "Only verified moderators and admins have access to post new scholarships on the platform.",
    },
  ];

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16  px-4">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>
        <div className="md:flex justify-between items-center gap-5">
          <div className="flex-1">
            <img src="https://i.ibb.co/jPnz7fkR/FAQs-bro.png" alt="" />
          </div>
          <div className="space-y-4 flex-1">
            {faqs.map((faq, index) => (
              <div key={index} className="border  rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full flex justify-between items-center p-5 text-left  transition"
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-5 pb-5 ">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
