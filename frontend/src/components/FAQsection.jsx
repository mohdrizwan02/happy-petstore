import { useNavigate } from "react-router";

const FAQsection = () => {
  const navigate = useNavigate()

  const faqsList = [
    {
      q: "What are some random questions to ask?",
      a: "That's exactly the reason we created this random question generator. There are hundreds of random questions to choose from so you're able to find the perfect random question.",
    },
    {
      q: "Do you include common questions?",
      a: "This generator doesn't include most common questions. The thought is that you can come up with common questions on your own so most of the questions in this generator.",
    },
    {
      q: "Can I use this for 21 questions?",
      a: "Yes! there are two ways that you can use this question generator depending on what you're after. You can indicate that you want 21 questions generated.",
    },
    {
      q: "Are these questions for girls or for boys?",
      a: "The questions in this generator are gender neutral and can be used to ask either male of females (or any other gender the person identifies with).",
    },
  ];

  return (
    <div className="leading-relaxed my-4 mx-6 md:mx-8">
      <section className="py-6">
        <div className="max-w-screen-xl mx-auto px-4 md:text-center md:px-8">
          <div className="max-w-xl md:mx-auto">
            <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Frequently Asked Questions
            </h3>
            <p className="mt-3 text-gray-600">
              Answered all frequently asked questions. Can’t find the answer
              you’re looking for? feel free to contact us.
            </p>
          </div>
          <div className="flex gap-3 items-center mt-4 md:justify-center">
            <button className="inline-block py-2 px-4 text-white font-medium bg-[#2f0601] hover:text-[#2f0601] hover:bg-white hover:ring-2 hover:ring-inset hover:ring-[#2f0601] rounded-lg shadow-md hover:shadow-none"
            onClick={()=>navigate("/contact")}>
              Contact Us
            </button>
            <button className="inline-block py-2 px-4 text-[#2f0601] ring-inset ring-2 ring-[#2f0601] font-medium hover:underline  rounded-lg"
            onClick={()=>navigate("/faqs")}>
              View all FAQs
            </button>
          </div>
        </div>
      </section>
      <div className="relative bg-white rounded-md mt-4 w-full sm:mx-auto">
        <div className="grid gap-4 py-4 md:grid-cols-2">
          {faqsList.map((item, idx) => (
            <div className="space-y-3 mt-4 px-8" key={idx}>
              <h4 className="text-gray-800 text-xl font-semibold ">{item.q}</h4>
              <p className="text-gray-500">{item.a}</p>
            </div>
          ))}
        </div>
        <span className="w-0.5 h-full bg-gray-200 m-auto absolute top-0 left-0 right-0 hidden md:block"></span>
      </div>
    </div>
  );
};

export default FAQsection;
