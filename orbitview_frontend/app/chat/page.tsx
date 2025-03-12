import { ChatInterface } from "./ChatInterace";

const dummyProfile: Profile = {
  id: 1,
  user: {
    id: 2,
    username: "tomzhang20",
    first_name: "Tom",
    last_name: "Zhang",
    date_joined: "2025-03-12T01:07:14Z",
  },
  date_of_birth: "2008-04-06",
  byline: "Founding Engineer @ OrbitView | I love people and helping them out",
  profile_pic: "http://127.0.0.1:8000/media/profile_pics/1728766936544.jpg",
  membership: "C",
  website: "https://www.tomzhang.info/",
  linkedin: "https://www.linkedin.com/in/tom-zhang-485341274/",
  external_links: null,
  experiences: [
    {
      title: "Founding Engineer",
      type: "WORK",
      employment_type: "SELF_EMPLOYED",
      company: {
        id: 2,
        logo: "http://127.0.0.1:8000/media/company-logos/orbitview.jpg",
        description:
          "OrbitView empowers professionals to create AI-powered versions of themselves, sharing their expertise effortlessly.",
        website: "https://orbitview.net",
        type: "CORP",
      },
      start_date: "2024-07-25",
      end_date: null,
    },
    {
      title: "Head of Engineering Department",
      type: "CLUB",
      employment_type: "FREELANCE",
      company: {
        id: 3,
        logo: "http://127.0.0.1:8000/media/company-logos/ehss_sci_soc.jpg",
        description: "Here for Haig STEM Opportunities, Labs, & Contest Help",
        website: "https://earlhaigsciencesociety.com/",
        type: "CLUB",
      },
      start_date: "2024-06-12",
      end_date: null,
    },
  ],
};

const Chat = () => {
  return <ChatInterface profile={dummyProfile} />;
};

export default Chat;
