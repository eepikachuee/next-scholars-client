import { Card, CardContent, CardTitle } from "@/components/ui/card";

const successStories = [
  {
    name: "Ayesha Rahman",
    country: "Bangladesh",
    university: "University of Toronto",
    degree: "Masters in Computer Science",
    photo: "https://randomuser.me/api/portraits/women/75.jpg",
    story:
      "NextScholars helped me apply easily and track my status. I'm now in Canada pursuing my dream!",
  },
  {
    name: "Samir Patel",
    country: "India",
    university: "ETH Zurich",
    degree: "PhD in Engineering",
    photo: "https://randomuser.me/api/portraits/men/64.jpg",
    story:
      "From finding scholarships to applying—it was smooth, fast, and super helpful!",
  },
  {
    name: "Fatima Noor",
    country: "Pakistan",
    university: "University of Melbourne",
    degree: "Bachelor of Business",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    story:
      "I was overwhelmed at first, but this platform simplified everything. Truly grateful!",
  },
];

export default function SuccessStoriesSection() {
  return (
    <section className="py-16 px-4  md:px-8">
      <div className="max-w-7xl px-4 mx-auto text-center">
        <h2 className="text-3xl font-bold  mb-4">
          Success Stories from Our Scholars
        </h2>
        <p className=" mb-12">
          Hear how students around the world achieved their dreams with
          NextScholars.
        </p>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {successStories.map((story, index) => (
            <Card
              key={index}
              className=" shadow-md hover:shadow-lg transition-all"
            >
              <CardContent className="flex flex-col items-center text-center p-6">
                <img
                  src={story.photo}
                  alt={story.name}
                  className="w-24 h-24 rounded-full mb-4 object-cover"
                />
                <CardTitle className="text-xl font-semibold ">
                  {story.name}
                </CardTitle>
                <p className="text-sm  mb-1">
                  {story.degree} at {story.university}
                </p>
                <p className="text-sm  mb-4">{story.country}</p>
                <p className=" text-sm italic">"{story.story}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
